# Eblockfy

Eblockfy es una aplicacion que te permite guardar certificados en la blockchain de [Ethereum](https://ethereum.org/)

## INSTRUCCIONES:

### REQUISITOS: 
Para ejecutar la aplicacion es necesario tener instalado el programa Docker.
			- Docker version 17.03.2-ce o mayor [INFO](https://docs.docker.com/install)

Para poder guardar los certificados deberá tener instalada, en su navegador, la extensión [Metamask](https://metamask.io/) y conectarse a la red Ropsten.

### INSTALAR EBLOCKFY: 
La primera vez que vaya a usar la aplicacion tendra que instalarla ejecutando el siguiente script, la aplicacion se iniciara automaticamente.
```bash 
./scripts/installEblockfy.sh
```
### ACCEDER A EBLOCKFY:
La app serÃ¡ accesible desde http://localhost:80

### DESINSTALAR EBLOCKFY: 
Para desinstalar la aplicacion ejecute el siguiente script.
```bash
./scripts/uninstallEblockfy.sh
```

### INICIAR EBLOCKFY: 
Si ha detenido la aplicacion en algÃºn momento, podrÃ¡ iniciarla con el siguiente script.
```bash
./scripts/startEblockfy.sh
```

### STOP EBLOCKFY: 
Si quiere detener la aplicacion puede ejcutar el siguiente script.
```bash
./scripts/stopEblockfy.sh
```

### RESET EBLOCKFY: 
Si estÃ¡ teniendo problemas para iniciar la aplicacion ejecute el siguiente script.
```bash
./scripts/resetEblockfy.sh
```


### UPDATE EBLOCKFY: 
Para actualizar la aplicacion ejecute el siguiente script.
```bash
./scripts/updateEblockfy.sh
```

### PERSONALIZAR EBLOCKFY: 
Personalice la aplicacion adaptandola al estilo de su organizacion. 

#### IMÃGENES: 
En la carpeta "images" deberÃ¡ tener las imÃ¡genes de su organizaciÃ³n con los siguientes nombres:  
-> logo.png (ogo que aparece en la cabecera de la aplicacion)  
-> ico.png (Icono que aparece en la pestaÃ±a del explorador)  
-> firma1.png (Aparece en el certificado. Firma identificativa de la persona que certifica)  
-> firma2.png (Aparece en el certificado. Firma identificativa de la institucion que ejerce el certificado)  
-> certified.png (Aparece en el certificado. Se recomienda no modificar esta imagen)  
-> Blockchain.png (Aparece en el certificado. Se recomienda no modificar esta imagen)  
-> verified-seal-grayscale.png (Marca de agua del certificado. Se recomienda no modificar esta imagen)  

#### ESTILOS: 
En la carpeta "css", modifique el archivo "mystyle.css" con la informacion que crea adecuada:  

  
	/* Fondo de Eblockfy */
	body {
	background: #f1f4f7 !important;
	}

	/* Tipo de fuente de Eblockfy */
	body {
	font-family: sans-serif !important;
	}

	/* Dimensiones de fuente  de Eblockfy */
	body {
	font-size: 14px;
	}

	/* Color (cabeceras, botones, etc) */
	.btn-primary, .btn-primary:hover, .btn-primary:focus, .btn-primary:active, .btn-primary.active, .open > .dropdown-toggle.btn-primary, .btn-primary.disabled, .btn-primary[disabled], fieldset[disabled], .btn-primary, .btn-primary.disabled:hover, .btn-primary[disabled]:hover, fieldset[disabled], .btn-primary:hover, .btn-primary.disabled:focus, .btn-primary[disabled]:focus, fieldset[disabled], .btn-primary:focus, .btn-primary.disabled:active, .btn-primary[disabled]:active, fieldset[disabled], .btn-primary:active, .btn-primary.disabled.active, .btn-primary[disabled].active, fieldset[disabled], .btn-primary.active, .bg-info, .bg-blue a.bg-info:hover, a.bg-blue:hover, .label-info, .label-info[href]:hover, .label-info[href]:focus, .panel-primary > .panel-heading, .panel-info > .panel-heading, .timeline-badge.primary, .timeline-badge.info, .progress-bar, .progress-bar-info, .progress-bar-blue, .sidebar ul.nav a:hover, .sidebar ul.nav li.parent ul li a:hover, .sidebar ul.nav, .active a, .sidebar ul.nav li.parent a.active, .sidebar ul.nav, .active > a:hover, .sidebar ul.nav li.parent a.active:hover, .sidebar ul.nav, .active > a:focus, .sidebar ul.nav li.parent a.active:focus, .sidebar ul.nav li.current a, .datepicker table tr td.active, .datepicker table tr td.active:hover, .datepicker table tr td.active.disabled, .datepicker table tr td.active.disabled:hover, .datepicker table tr td.active:hover, .datepicker table tr td.active:hover:hover, .datepicker table tr td.active.disabled:hover, .datepicker table tr td.active.disabled:hover:hover, .datepicker table tr td.active:focus, .datepicker table tr td.active:hover:focus, .datepicker table tr td.active.disabled:focus, .datepicker table tr td.active.disabled:hover:focus, .datepicker table tr td.active:active, .datepicker table tr td.active:hover:active, .datepicker table tr td.active.disabled:active, .datepicker table tr td.active.disabled:hover:active, .datepicker table tr td.active.active, .datepicker table tr td.active:hover.active, .datepicker table tr td.active.disabled.active, .datepicker table tr td.active.disabled:hover.active, .open, .dropdown-toggle.datepicker table tr td.active, .open, .dropdown-toggle.datepicker table tr td.active:hover, .open, .dropdown-toggle.datepicker table tr td.active.disabled, .open, .dropdown-toggle.datepicker table tr td.active.disabled:hover  {
	background-color: #4fe907 !important;
	}

	/* Dimensiones logo.png */
	#logo {
	width: 10px; 
	height: 90px;
	}

	/* Dimensiones firma1.png */
	#firma1 {
	width: 305px !important; 
	height: 90px !important;
	}

	/* Dimensiones firma2.png */
	#firma2 {
	width: 305px !important; 
	height: 90px !important;
	}

	/* Dimensiones certified.png */
	#certified {
	width: 305px !important; 
	height: 90px !important;
	}

	/* TamaÃ±o Blockchain.png */
	#Blockchain {
	width: 305px !important; 
	height: 90px !important;
	}

	/* Dimensiones verified-seal-grayscale.png */
	#verified-seal-grayscale {
	width: 305px !important; 
	height: 90px !important;
	}


