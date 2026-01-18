//Generar hashes válidos con la librería que usa el back

const bcrypt = require("bcryptjs");

(async () => {
    const password = "admin";
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    console.log(hash);
})();
