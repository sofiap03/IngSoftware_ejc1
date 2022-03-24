const express = require('express');
const router = express.Router();
const departamentsJSON = require('../json/departaments.json')

//REQUEST HTTP API RESTFUL

//Endpoint estatico:  http://localhost:4000/api/v1/departaments
router.get('/', (req, res)=> {
  res.json(departamentsJSON)
});

//ejercicio1: Dependiendo del codigo del departamento que el usuario
//ingrese como parametro en la URI, cargar todos los municipios que le corresponde

//Endpoint estatico:  http://localhost:4000/api/v1/departaments/5
router.get('/:departamentId', (req, res)=> {
  const {departamentId} = req.params
  const departaments_municipalities = departamentsJSON.filter(
  (departament)=>departament['c_digo_dane_del_departamento'] === departamentId
  );
  res.json(departaments_municipalities);
});

//consultar los departamentos que tienen un nombre con mas de 8 caracteres
//Endpoint estatico:  http://localhost:4000/api/v1/departaments/departament/name
router.get('/departament/name', (req,res)=>{
  const departaments = departamentsJSON.filter(
    (departament)=> departament['departamento'].length > 15
  );
  res.json(departaments);
});

/* 1. Mostrar los departamentos cuyo código dane es mayor a 15 y menor a 20 */
//Endpoint: http://localhost:4000/api/v1/departaments/departament/codigoD //
router.get('/departament/codigoD', (req,res)=>{
  const departaments = departamentsJSON.filter((dep)=>
  dep['c_digo_dane_del_departamento'].length > 15 && dep['c_digo_dane_del_departamento'].length < 20);
  res.json(departaments);
});

/* 2. Como parámetro opcional el usuario ingresa el código del departamento y se cargan sus municipios, validar si el usuario no ingresa el
código traer todo el JSON*/
//Endpoint: http://localhost:4000/api/v1/departaments/departament/opcional?codigo=
router.get('/departament/opcional', (req,res)=>{
  if(req.query.codigo){
    const departaments_municipalities = departamentsJSON.filter(
      (departament)=>
      departament['c_digo_dane_del_departamento'] === req.query.codigo
    );
    res.json(departaments_municipalities);
  } else {
    const departament = departamentsJSON
    res.json(departament);
  }
});

/* 3. El usuario ingresa como parámetro opcional el nombre del municipio que desea consultar de lo contrario por defecto se cargan los
municipios de Caldas */
//Endpoint: http://localhost:4000/api/v1/departaments/departament/departamento?
router.get('/departament/departamento', (req,res)=>{
  if(req.query.codigo){
    const departaments_municipalities = departamentsJSON.filter(
      (departament)=>
      departament['departamento'] === req.query.codigo
    );
    res.json(departaments_municipalities);
  } else {
    const departament = departamentsJSON.filter(
      (departament)=>
      departament['departamento'] === 'Caldas'
    );
    res.json(departament);
  }
});

/* 4. Mostrar todos los departamentos cuyo nombre inicia por la letra "C" */
//Endpoint: http://localhost:4000/api/v1/departaments/departament/C
router.get('/departament/C', (req,res)=>{
  const departaments = departamentsJSON.filter(
    (departament) => departament['departamento'][0] === 'C'
  );
  res.json(departaments);
});


module.exports = router