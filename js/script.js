document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const codigo = document.getElementById("codigo").value;
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("errorMsg");

  try {
    const response = await fetch("https://api-parcial.crangarita.repl.co/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ codigo, clave: password })
    });

    if (!response.ok) {
      throw new Error("Error en la conexión con el servidor");
    }

    const data = await response.json();

    if (data && data.codigo) {
      // Guardar usuario en localStorage
      localStorage.setItem("usuario", JSON.stringify(data));

      // Redirigir a interfaz de notas
      window.location.href = "notas.html";
    } else {
      errorMsg.textContent = "Credenciales inválidas.";
      document.getElementById("codigo").value = "";
      document.getElementById("password").value = "";
    }
  } catch (err) {
    errorMsg.textContent = "Error: " + err.message;
    document.getElementById("codigo").value = "";
    document.getElementById("password").value = "";
  }
});
