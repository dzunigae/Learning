<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <script>
        function cambiarDatos(id) {
            if (id === "datos1") {
                document.getElementById("datos2").style.display = "none";
                document.getElementById("datos1").style.display = "block";
            } else if (id === "datos2") {
                document.getElementById("datos1").style.display = "none";
                document.getElementById("datos2").style.display = "block";
            }
        }
    </script>
</head>

<body>
    <div>
        <center>
            <h2>Buenas a todos, aquí se diferenciarán los distintos elementos abordados en esta primera sesión.</h2>
        </center>
        <button onclick="cambiarDatos('datos1')">Datos 1: Nombre de una persona en específico</button>
        <button onclick="cambiarDatos('datos2')">Datos 2: Nombre y servicios de una empresa</button>
    </div>

    <?php //Datos del ejercicio 1?>

    <div id="datos1">
        <?php
        /* Literalmente en todo este código se hace ejemplificación de como usar los comentarios. */
        ?>
        <h3>Nombres: </h3>
        <?php
        echo "Luis Pablo <br />"; //Primer segmento de un programa PHP
        ?>
        <h3>Apellidos:</h3>
        <?php
        echo "Perez Jimenez <br />"; //Segundos egmento del mismo programa
        ?>
        <h3>Edad:</h3>
        <?php
        echo "26 a&ntildeos"; //Tercer segmentodel mismo programa            
        ?>
        <h3>Tel&eacutefono:</h3>
        <?php
        echo "+57 (1) 323 12 00"; //Cuarto segmento del mismo programa            
        ?>
        <h3>Dirección</h3>
        <?php
        echo "<strong>Cr.</strong> 34 <strong>No.</strong> 54 - 25"; //Quinto segmento del mismo programa
        ?>
    </div>

    <?php //Datos del ejercicio 2?>

    <div id="datos2">
        <?php
        /* Mi nombre es Daniel Armando Zúñiga Espinosa, soy estudiante de Ingeniería de Sistemas y Computación y un
        apacionado por el desarrollo web, la razón de la existencia de esta página se debe a mi proceso de aprendizaje
        sobre PHP, el cual he iniciado en el SENA. */
        ?>

        <?php //Datos de la empresa ?>
        <p><strong>Empresa:</strong> Finanzas Corp</p>
        <p><strong>Descripción</strong></p>
        <p>Finanzas Corp es una empresa de servicios financieros establecida en el año 2005 con sede en la ciudad de
            Nueva York.</p>
        <p>La empresa cuenta con un equipo de expertos en finanzas y asesoramiento financiero, con más de 50 años de
            experiencia combinada en el sector financiero.</p>
        <p>Finanzas Corp ha ayudado a cientos de clientes a lograr sus objetivos financieros a largo plazo, y ha sido
            reconocida por su excelencia en el servicio al cliente y su capacidad para proporcionar soluciones
            personalizadas.</p>

        <?php //Servicios de la empresa ?>
        <p><strong>Servicios:</strong></p>
        <ul>
            <li><strong>Asesoramiento financiero:</strong> Ofrecen asesoramiento personalizado en la planificación
                financiera, inversión, gestión de riesgos, y otros temas relacionados con el dinero.</li>
            <li><strong>Planificación de la jubilación:</strong> Ayudan a las personas a planificar y prepararse para su
                jubilación, incluyendo asesoramiento en inversiones, seguridad social, y otros aspectos de la
                planificación financiera a largo plazo.</li>
            <li><strong>Gestión de inversiones:</strong> Manejan las inversiones de sus clientes, buscando obtener los
                mejores resultados posibles en función de sus objetivos financieros.</li>
            <li><strong>Préstamos:</strong> Ofrecen préstamos personales, hipotecarios y empresariales con tasas de
                interés competitivas.</li>
        </ul>
        <br>
        <br>
        <br>
        <p>Disclaimer: Los datos presentados sobre esta empresa fueron generados automáticamentepor herramientas de IA.
            Si existe alguna reglamentación que lo prohíba por favor hacermelo saber.</p>
    </div>
</body>

</html>