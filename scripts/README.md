# Para ejecutar la aplicación:

    # Instalar Docker:
    https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce-1

    # Descargar eblockfy:
    docker pull jdiegosierra/eblockfy-app:latest

    # Lanzarlo:
    docker run -d --name eblockfy-server -h eblockfy-server -p 80:80 jdiegosierra/eblockfy-app:latest

    # En el navegador: 
    localhost/index.html

    # Parar eblockfy:
    docker stop eblockfy-server

    # Volver a iniciar eblockfy:
    docker start eblockfy-server 



MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMmMMNMMMMMMMMNNNNNNMMMMMMMMNNNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNMMMMMMMMMMMMMmdmMMMMMMMMMMMM
MMMMMMMdhs+s+ooohyNMMMMM-      `:sMMMM+ .MMMMMMMMMMMMMMMMMMMMMMMMMMMMs  MMMMMMMMMMMo`   mMMMMMMMMMMM
MMMMMys+++++++++++ooNMMM- `mmmdo  :MMM+ .MMMMMMMMMMMMMMMMMMMMMMMMMMMMs  MMMMMMMMMMo `hNNMMMMMMMMMMMM
MMMNs+++o+++++ooso+++yMM- `MMMMM- `MMM+ .MMMMMMMMMMMMMMMMMMMMMNmNMMMMs  MMMMMMMMMM- :MMMMMMMMMMMMMMM
MMNy+++o++odmmy++ds+++yM- `ddhy: .hMMM+ .MMMMh/.`  .:sNMMMMs-     .MMs  MMMN+ `so     .. -NMMMN- -NM
MMNs++os++ooooo++sN+++sN-       `/sNMM+ .MMN- .sdmmy- `dMM: `yNMMdsMMs  MNo` +NMNN- /NNN. -NMN: .NMM
MMNs++oy++ymmmmmmmm+++yM- `MMMMNh- `dM+ .MM+ `NMMMMMM: .Mh  dMMMMMMMMs  s. :mMMMMM- /MMMm. -N/ .mMMM
MMMyo++so++shhyyoso++odM- `MMMMMMh  +M+ .MM/ .NMMMMMM: .Mh  hMMMMMMMMs  d: `sNMMMM- /MMMMm. ` `mMMMM
MMMMso++++o+++++++++ohMM- `hhhhyo` `dM+ .MMm. -ymNNh/ `hMM: `odNNmhmMs  MMd: `sNMM- /MMMMMm` `dMMMMM
MMMMMmso++++++++++oymMMM:```````./sNMMo`.MMMNy:`   `-oNMMMMy:`    .dMs``MMMMd:`.sM-`+MMMMM+ `dMMMMMM
MMMMMMs++o+oo+o+o+odMMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNMMMMMMMMMMMMNNMMMMMMMMMMMMMMMMMMMMMMMMo  hMMMMMMM
MMMMMh++++++++++++++dMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMs  yMMMMMMMM
MMMMd++++++++++++++++mMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMy  yMMMMMMMMM
MMMN+++++++++++++++++omMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNydMMMMMMmMMMMMMMMMMMMMMMMMMMMMMMM
MMMyosyhs+++yy+++shyysyMMMMMMMMMMMMMMMMMMMMMNNMMMMMMMMMMMMMNMNMMMMshmdMhdmhdmmddNdmdmmdmddmMMMMMMMMM
MMMMMMMMMms+mmoomMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNMmsdNMNmMNNMNNNMNNNNNNNNNNMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM


INSTRUCCIONES:

	#REQUISITOS:: Para ejecutar la aplicación es necesario tener instalado el programa Docker.
		- Docker version 17.03.2-ce or higher (INFO --> https://docs.docker.com/install)

	#INSTALAR EBLOCKFY: La primera vez que vaya a usar la aplicación tendra que instalarla ejecutando el siguiente script, la aplicación se iniciará automáticamente.
		- ./scripts/installEblockfy.sh

	#DESINSTALAR EBLOCKFY: Para desinstalar la aplicación ejecute el siguiente script.
		- ./scripts/uninstallEblockfy.sh

	#INICIAR EBLOCKFY: Si ha detenido la aplicación en algún momento, podrá iniciarla con el siguiente script.
		- ./scripts/startEblockfy.sh

	#STOP EBLOCKFY: Si quiere detener la aplicación puede ejcutar el siguiente script.
		- ./scripts/stopEblockfy.sh

	#RESET EBLOCKFY: Si está teniendo problemas para iniciar la aplicación ejecute el siguiente script.
		- Run ./scripts/resetEblockfy.sh

	#UPDATE EBLOCKFY: Para actualizar la aplicación ejecute el siguiente script.
		- Run ./scripts/updateEblockfy.sh

	#PERSONALIZAR EBLOCKFY: Personalice la aplicación adaptándola al estilo de su organización. 
	
		**IMÁGENES**: En la carpeta "images" deberá tener las imágenes de su organización con los siguientes nombres:
			- logo.png (ogo que aparece en la cabecera de la aplicación)
			- ico.png (Icono que aparece en la pestaña del explorador)
			- firma1.png (Aparece en el certificado. Firma identificativa de la persona que certifica)
			- firma2.png (Aparece en el certificado. Firma identificativa de la institución que ejerce el certificado)
			- certified.png (Aparece en el certificado. Se recomienda no modificar esta imagen)
			- Blockchain.png (Aparece en el certificado. Se recomienda no modificar esta imagen)
			- verified-seal-grayscale.png (Marca de agua del certificado. Se recomienda no modificar esta imagen)

		**ESTILOS**: En la carpeta "css", modifique el archivo "mystyle.css" con la información que crea adecuada:

			/* Fondo de Eblockfy */
			body {
			background: #f1f4f7 !important;
			}

			/* Tipo de fuente de Eblockfy */
			body {
			font-family: sans-serif !important;
			}

			/* Tamaño de fuente  de Eblockfy */
			body {
			font-size: 14px;
			}

			/* Color temático (cabeceras, botones, etc) */
			.btn-primary, .btn-primary:hover, .btn-primary:focus, .btn-primary:active, .btn-primary.active, .open > .dropdown-toggle.btn-primary, .btn-primary.disabled, .btn-primary[disabled], fieldset[disabled], .btn-primary, .btn-primary.disabled:hover, .btn-primary[disabled]:hover, fieldset[disabled], .btn-primary:hover, .btn-primary.disabled:focus, .btn-primary[disabled]:focus, fieldset[disabled], .btn-primary:focus, .btn-primary.disabled:active, .btn-primary[disabled]:active, fieldset[disabled], .btn-primary:active, .btn-primary.disabled.active, .btn-primary[disabled].active, fieldset[disabled], .btn-primary.active, .bg-info, .bg-blue a.bg-info:hover, a.bg-blue:hover, .label-info, .label-info[href]:hover, .label-info[href]:focus, .panel-primary > .panel-heading, .panel-info > .panel-heading, .timeline-badge.primary, .timeline-badge.info, .progress-bar, .progress-bar-info, .progress-bar-blue, .sidebar ul.nav a:hover, .sidebar ul.nav li.parent ul li a:hover, .sidebar ul.nav, .active a, .sidebar ul.nav li.parent a.active, .sidebar ul.nav, .active > a:hover, .sidebar ul.nav li.parent a.active:hover, .sidebar ul.nav, .active > a:focus, .sidebar ul.nav li.parent a.active:focus, .sidebar ul.nav li.current a, .datepicker table tr td.active, .datepicker table tr td.active:hover, .datepicker table tr td.active.disabled, .datepicker table tr td.active.disabled:hover, .datepicker table tr td.active:hover, .datepicker table tr td.active:hover:hover, .datepicker table tr td.active.disabled:hover, .datepicker table tr td.active.disabled:hover:hover, .datepicker table tr td.active:focus, .datepicker table tr td.active:hover:focus, .datepicker table tr td.active.disabled:focus, .datepicker table tr td.active.disabled:hover:focus, .datepicker table tr td.active:active, .datepicker table tr td.active:hover:active, .datepicker table tr td.active.disabled:active, .datepicker table tr td.active.disabled:hover:active, .datepicker table tr td.active.active, .datepicker table tr td.active:hover.active, .datepicker table tr td.active.disabled.active, .datepicker table tr td.active.disabled:hover.active, .open, .dropdown-toggle.datepicker table tr td.active, .open, .dropdown-toggle.datepicker table tr td.active:hover, .open, .dropdown-toggle.datepicker table tr td.active.disabled, .open, .dropdown-toggle.datepicker table tr td.active.disabled:hover  {
			background-color: #4fe907 !important;
			}

			/* Tamaño logo.png */
			#logo {
			width: 10px; 
			height: 90px;
			}

			/* Tamaño firma1.png */
			#firma1 {
			width: 305px !important; 
			height: 90px !important;
			}

			/* Tamaño firma2.png */
			#firma2 {
			width: 305px !important; 
			height: 90px !important;
			}

			/* Tamaño certified.png */
			#certified {
			width: 305px !important; 
			height: 90px !important;
			}

			/* Tamaño Blockchain.png */
			#Blockchain {
			width: 305px !important; 
			height: 90px !important;
			}

			/* Tamaño verified-seal-grayscale.png */
			#verified-seal-grayscale {
			width: 305px !important; 
			height: 90px !important;
			}

