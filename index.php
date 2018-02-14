<!doctype html>
<html lang="es">
<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" >

  <title>Factura!</title>
  <style >
  div {
    transition: all linear 0.5s;

  }

  .ng-hide {
    height: 0;
  }
</style>
</head>
<body>

  <div class="container" ng-app="facturaApp" ng-controller="reportFactura" ng-init="initVars()">
    <!-- Content here -->
    <div class="row">
      <div class="col-sm">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Datos del Usuario </h5>
            <h6 class="card-subtitle">Name: <b>{{aUserDatos[0].sName}} </b> Last Name: <b>{{aUserDatos[0].sLastName}}</b> </h6>
            <pre class="card-text">Soriana # de Proveedor: <b> {{aUserSoriana[0].sUserWebService}} </b></pre>
            <button ng-click="loadReportes(aUserSoriana[0].iId)" class="btn btn-primary" ng-hide="ocultarTabla"> <i class="fa fa-search"></i> Leer Reportes</button>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Reportes disponibles</h5>
            <table class="table table-striped table-bordered table-hover" ng-hide="ocultarTabla">
              <thead>
                <td>Id</td>
                <td>Folio</td>
                <td># Documentos</td>
                <td>Total</td>
                <td>Sucursal</td>
                <td># Remision</td>
                <td>Fecha</td>

              </thead>
              <tbody>
                <tr ng-repeat="rep in aReportes">
                  <td class="text-right">{{rep.iId}}</td>
                  <td class="text-right">{{rep.iFolio}}</td>
                  <td class="text-right">{{rep.iDocumentos}}</td>
                  <td class="text-right">{{rep.dTotal| currency}}</td>
                  <td class="text-right">{{rep.iScursal}}</td>
                  <td class="text-right">{{rep.sFactura}}</td>
                  <td>{{rep.dtFecha | date:'longDate'}}</td>
                  <td><button class="btn btn-success" ng-click="loadDocumento(rep, aUserSoriana[0].iId)"><i class="fa fa-file"></i> cargar documentos</button></td>
                </tr>

              </tbody>
            </table>

            <div class="row" ng-show="ocultarTabla">

              <div class="col-3">
                <div class="card" style="width: 20rem;" >
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">Folio: <b>{{objReporte.iFolio}}</b></li>
                    <li class="list-group-item">Documentos: {{objReporte.iDocumentos}}</li>
                    <li class="list-group-item">Fecha: {{objReporte.dtFecha | date:'shortDate'}}</li>
                    <li class="list-group-item">Otros Impuestos: {{objDoc.dOtrosImpuestos | currency}}</li>
                    <li class="list-group-item">Sub Total: <b>{{objDoc.dSubTotal | currency }}</b></li>
                    <li class="list-group-item">Total: <b>{{objDoc.dTotal | currency }}</b></li>
                    <li class="list-group-item">Total Iva: {{objDoc.dTotalIva | currency }}</li>
                    <li class="list-group-item">Folio Soriana:<b>{{objDoc.iFolio  }}</b></li>
                    <li class="list-group-item">Sucursal: <b>{{objDoc.iScursal  }}</b></li>
                    <li class="list-group-item"># Factura: <b>{{objDoc.sFactura  }}</b></li>
                  </ul>
                  <div class="row">
                    <div class="col-6">
                      <button class="btn btn-primary" ng-click="mostrarTable()"><i class="fa fa-arrow-up"></i> Mostrar Tabla Reportes</</button>
                    </div>
                    <div class="col-6">
                      <button class="btn btn-sucess" ng-click="loadArticulos(objDoc.iId)"><i class="fa fa-list-alt"></i> Cargar Articulos </button>
                    </div>


                  </div>
                </div>
              </div>
              <div class="col-9">
                <table class="table table-bordered table-striped" ng-repeat="art in aArticulos">
                  <thead>
                    <td>Cantidad</td>
                    <td>Cantidad Empaque</td>
                    <td>Codigo</td>
                    <td>Descripcion</td>
                    <td>Fecha</td>
                  </thead>
                  <tbody>
                    <td>{{art.iCantidad}} </td>
                    <td>{{art.iCantidadEmpaque}}</td>
                    <td>{{art.sCodigo}}</td>
                    <td>{{art.sDescripcion}}</td>
                    <td>{{art.dtCreateDate | date:'shortDate'}}</td>
                  </tbody>
                </table>

                <button class="btn btn-primary" ng-click="createAddenda()" ng-show="aArticulos.length"><i class="fa fa-plus-square"></i> Crear addenda</button>
                <div class="col-12">
                  <pre>
                    {{output}}
                  </pre>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>


      <div class="collapse" ng-repeat="rep2 in aReportes">
        <div class="card card-body">
          {{rep2.dtFecha}}
        </div>
      </div>


    </div>

  </div>


  <!-- Optional JavaScript -->
  <!-- jQuery first, then Popper.js, then Bootstrap JS -->
  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/moment.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.0/i18n/angular-locale_es-mx.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.7/angular-animate.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.7/angular-aria.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.7/angular-messages.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.7/angular-resource.min.js"></script>

  <script src="//cdnjs.cloudflare.com/ajax/libs/angular-strap/2.3.12/angular-strap.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/angular-strap/2.3.12/angular-strap.tpl.min.js"></script>

  <script src="angular/facturaApp.js" type="text/javascript"></script>
  <script src="angular/controller/reportFactura.js" type="text/javascript"></script>

</body>
</html>
