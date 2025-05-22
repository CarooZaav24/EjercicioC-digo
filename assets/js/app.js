// Definimos la URL base de la API de GitHub
const baseEndpoint = 'https://api.github.com';
// Construimos el endpoint para consultar usuarios, concatenando con "/users"
const usersEndpoint = `${baseEndpoint}/users`;

// Obtenemos los elementos del DOM donde mostraremos los datos del usuario
// Se usa '#' para seleccionar por ID y '.' para seleccionar por clase
const $n = document.querySelector('#name');     // Selecciona el elemento con id="name"
const $b = document.querySelector('#blog');     // Selecciona el elemento con id="blog"
const $l = document.querySelector('.location'); // Selecciona el elemento con class="location"

// Declaramos una función asíncrona que recibe un nombre de usuario de GitHub
// y muestra sus datos (nombre, blog, ubicación) en el DOM
async function displayUser(username) {
  // Mientras se cargan los datos, informamos al usuario
  $n.textContent = 'Cargando...';

  try {
    // Usamos fetch para hacer una petición GET a la API de GitHub con el nombre del usuario
    const response = await fetch(`${usersEndpoint}/${username}`);

    // Verificamos si la respuesta fue exitosa (código 200–299)
    if (!response.ok) {
      // Si la respuesta es un error (por ejemplo, 404), lanzamos un error personalizado
      throw new Error(`Usuario no encontrado: ${username}`);
    }

    // Convertimos la respuesta en formato JSON para poder acceder a sus propiedades
    const data = await response.json();

    // Mostramos los datos obtenidos en el DOM
    // Usamos `||` para mostrar un mensaje por defecto si el campo viene vacío o null
    $n.textContent = data.name || 'Nombre no disponible';
    $b.textContent = data.blog || 'Blog no disponible';
    $l.textContent = data.location || 'Ubicación no disponible';
  } catch (err) {
    // En caso de error (ya sea de red o del API), ejecutamos esta función para mostrar el problema
    handleError(err);
  }
}

// Esta función se ejecuta si ocurre un error en displayUser()
// Muestra un mensaje de error en la consola y en el DOM
function handleError(err) {
  console.log('OH NO! Algo salió mal al obtener los datos del usuario');
  console.error(err); // Imprime el error completo en la consola para depuración
  $n.textContent = `Algo salió mal: ${err.message}`; // Muestra el mensaje de error en pantalla
}

// Llamamos a la función displayUser con un nombre de usuario de prueba
// Esto es lo que inicia la aplicación al cargar la página
displayUser('stolinski');