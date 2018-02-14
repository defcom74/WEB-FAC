angular.module('facturaApp').controller('reportFactura', ['$scope', 'userDatos', 'userSoriana', 'sorReportes', 'sorDocumentos', 'sorArticulos',
	function ($scope, userDatos, userSoriana, sorReportes, sorDocumentos, sorArticulos){

		$scope.aUserDatos = [];
    $scope.aUserSoriana = [];
    $scope.aReportes = [];
    $scope.aDocumentos = [];
    $scope.aArticulos = [];

    $scope.objReporte = [];
    $scope.objDoc = [];


    $scope.ocultarTabla = false;
    $scope.iCantidadTotal = 0;
    $scope.iCantidadTotalBultos = 0;
    $scope.output = '';



		$scope.initVars = function () {
			console.log("iniciar");
			$scope.loadDatos(1);
      $scope.loadDatosSoriana(1);

		};

		$scope.loadDatos = function(iUserId) {

			var objData = userDatos.get( {iUserId:iUserId   } , function(data){
            $scope.aUserDatos = data.UserById;
            console.log(data);

            if ($scope.aUserDatos.length == 0) {
              $scope.txtMsg = "Data not found ";
            }
            else
              $scope.txtMsg = "";
        });
		};


    $scope.loadDatosSoriana = function(iUserId) {

			var objData = userSoriana.get( {iUserId:iUserId   } , function(data){
            $scope.aUserSoriana = data.UserById;
            console.log(data);

            if ($scope.aUserSoriana.length == 0) {
              $scope.txtMsg = "Data not found ";
            }
            else
              $scope.txtMsg = "";
        });
		};

    $scope.loadReportes = function(iId) {

			var objData = sorReportes.get( {iId:iId   } , function(data){
            $scope.aReportes = data.Report;
            console.log(data);

            if ($scope.aReportes.length == 0) {
              $scope.txtMsg = "Data not found ";
            }
            else
              $scope.txtMsg = "";
        });
		};


    $scope.loadDocumento = function(rep, iSorId) {
      $scope.ocultarTabla  = ! $scope.ocultarTabla ;
      $scope.objReporte = rep;

			var objData = sorDocumentos.get( {iId: rep.iIdrep , iDocId: rep.iIdDocs, iSorId: iSorId  } , function(data){
            $scope.aDocumentos = data.Docs;
            console.log(data);
            $scope.objDoc = $scope.aDocumentos[0];

            if ($scope.aDocumentos.length == 0) {
              $scope.txtMsg = "Data not found ";
            }
            else
              $scope.txtMsg = "";
        });
		};

    $scope.mostrarTable = function () {
      $scope.ocultarTabla  = ! $scope.ocultarTabla ;
      $scope.aArticulos = [];
			$scope.output = '';
    };


    $scope.loadArticulos = function(iId) {

      var objData = sorArticulos.get( {iId: iId  } , function(data){
            $scope.aArticulos = data.Articulos;
            console.log(data);
            $scope.iCantidadTotal = 0;
            $scope.iCantidadTotalBultos = 0;
            for( var arc = 0; arc < $scope.aArticulos.length; arc++){
              $scope.iCantidadTotal += $scope.aArticulos[arc].iCantidad;
              $scope.iCantidadTotalBultos += $scope.aArticulos[arc].iCantidad / $scope.aArticulos[arc].iCantidadEmpaque ;
            }

            if ($scope.aArticulos.length == 0) {
              $scope.txtMsg = "Data not found ";
            }
            else
              $scope.txtMsg = "";
        });
    };

    $scope.createAddenda = function(){
      try {
        var ns1 = 'http://factura-electronica.biz/addenda';
        var xsi = 'http://publicidad.soriana.com/publicidad/resources/InfoInst/GuiaImplementacion/DSCrgRemProvNotaEntrada.xsd';

				$scope.output ='';

        var docXml = document.implementation.createDocument(ns1,'DSCargaRemisionProv');
        //docXml.documentElement.setAttributeNS(xsi, 'xsi:schemaLocation', xsi);

        var remision = docXml.createElement('Remision');
        remision.setAttribute('Id', 'Remision0');
        remision.setAttribute('RowOrder', 0);



        var xmlProveedor = docXml.createElement( 'Proveedor');
        var xmlTextNode = docXml.createTextNode($scope.aUserSoriana[0].sUserWebService);
        xmlProveedor.appendChild(xmlTextNode);

        var xmlRemision = docXml.createElement('Remision');
        xmlTextNode = docXml.createTextNode($scope.objDoc.sFactura.trim());
        xmlRemision.appendChild(xmlTextNode);

        remision.appendChild(xmlProveedor);
        remision.appendChild(xmlRemision);

        var xmlTemp = docXml.createElement('Consecutivo');
        xmlTextNode = docXml.createTextNode(0);
        xmlTemp.appendChild(xmlTextNode);
        remision.appendChild(xmlTemp);

        var xmlTemp = docXml.createElement('FechaRemision', null);
        var auxDate = new Date($scope.objDoc.dtFecha);

        xmlTextNode = docXml.createTextNode(moment(auxDate).format("YYYY-MM-DDT00:00:00-05:00"));
        xmlTemp.appendChild(xmlTextNode);
        remision.appendChild(xmlTemp);

        var xmlTemp = docXml.createElement('Tienda', null);
        xmlTextNode = docXml.createTextNode($scope.objDoc.iScursal);
        xmlTemp.appendChild(xmlTextNode);
        remision.appendChild(xmlTemp);

        var xmlTemp = docXml.createElement('TipoMoneda', null);
        xmlTextNode = docXml.createTextNode(1);
        xmlTemp.appendChild(xmlTextNode);
        remision.appendChild(xmlTemp);

        var xmlTemp = docXml.createElement('TipoBulto', null);
        xmlTextNode = docXml.createTextNode(2);
        xmlTemp.appendChild(xmlTextNode);
        remision.appendChild(xmlTemp);

        var xmlTemp = docXml.createElement('EntregaMercancia', null);
        xmlTextNode = docXml.createTextNode($scope.iCantidadTotal);
        xmlTemp.appendChild(xmlTextNode);
        remision.appendChild(xmlTemp);

        var xmlTemp = docXml.createElement('CumpleReqFiscales', null);
        xmlTextNode = docXml.createTextNode('true');
        xmlTemp.appendChild(xmlTextNode);
        remision.appendChild(xmlTemp);


        var xmlTemp = docXml.createElement('CantidadBultos', null);
        xmlTextNode = docXml.createTextNode($scope.iCantidadTotalBultos);
        xmlTemp.appendChild(xmlTextNode);
        remision.appendChild(xmlTemp);

        var xmlTemp = docXml.createElement('Subtotal', null);
        xmlTextNode = docXml.createTextNode($scope.objDoc.dSubTotal.toFixed(2));
        xmlTemp.appendChild(xmlTextNode);
        remision.appendChild(xmlTemp);

        var xmlTemp = docXml.createElement('Descuentos', null);
        xmlTextNode = docXml.createTextNode('0.00');
        xmlTemp.appendChild(xmlTextNode);
        remision.appendChild(xmlTemp);

        var xmlTemp = docXml.createElement('IEPS', null);
        xmlTextNode = docXml.createTextNode('0.00');
        xmlTemp.appendChild(xmlTextNode);
        remision.appendChild(xmlTemp);

        var xmlTemp = docXml.createElement('IVA', null);
        xmlTextNode = docXml.createTextNode('0.00');
        xmlTemp.appendChild(xmlTextNode);
        remision.appendChild(xmlTemp);

        var xmlTemp = docXml.createElement('OtrosImpuestos', null);
        xmlTextNode = docXml.createTextNode('0.00');
        xmlTemp.appendChild(xmlTextNode);
        remision.appendChild(xmlTemp);

        var xmlTemp = docXml.createElement('Total', null);
        xmlTextNode = docXml.createTextNode($scope.objDoc.dTotal.toFixed(2));
        xmlTemp.appendChild(xmlTextNode);
        remision.appendChild(xmlTemp);

        var xmlTemp = docXml.createElement('CantidadPedidos', null);
        xmlTextNode = docXml.createTextNode($scope.iCantidadTotal);
        xmlTemp.appendChild(xmlTextNode);
        remision.appendChild(xmlTemp);

        var xmlTemp = docXml.createElement('FechaEntregaMercancia', null);
        xmlTextNode = docXml.createTextNode(moment(auxDate).format("YYYY-MM-DDT00:00:00-05:00"));
        xmlTemp.appendChild(xmlTextNode);
        remision.appendChild(xmlTemp);

        var xmlTemp = docXml.createElement('FolioNotaEntrada', null);
        xmlTextNode = docXml.createTextNode($scope.objDoc.iFolio);
        xmlTemp.appendChild(xmlTextNode);
        remision.appendChild(xmlTemp);

        docXml.documentElement.appendChild(remision);

        var pedidos = docXml.createElement('Pedidos');
        pedidos.setAttribute('Id', 'Pedidos0');
        pedidos.setAttribute('RowOrder', 0);
        pedidos.setAttribute('xmlns', null);

        var xmlTemp = docXml.createElement( 'Proveedor', '');
        xmlTextNode = docXml.createTextNode($scope.aUserSoriana[0].sUserWebService);
        xmlTemp.appendChild(xmlTextNode);
        pedidos.appendChild(xmlTemp);

        var xmlTemp = docXml.createElement('Remision', '');
        xmlTextNode = docXml.createTextNode($scope.objDoc.sFactura.trim());
        xmlTemp.appendChild(xmlTextNode);
        pedidos.appendChild(xmlTemp);

        var xmlTemp = docXml.createElement('FolioPedido', '');
        xmlTextNode = docXml.createTextNode($scope.objDoc.iFolio);
        xmlTemp.appendChild(xmlTextNode);
        pedidos.appendChild(xmlTemp);

        var xmlTemp = docXml.createElement('Tienda', null);
        xmlTextNode = docXml.createTextNode($scope.objDoc.iScursal);
        xmlTemp.appendChild(xmlTextNode);
        pedidos.appendChild(xmlTemp);

        var xmlTemp = docXml.createElement('CantidadArticulos', null);
        xmlTextNode = docXml.createTextNode($scope.iCantidadTotal);
        xmlTemp.appendChild(xmlTextNode);
        pedidos.appendChild(xmlTemp);

        docXml.documentElement.appendChild(pedidos);

        for (var iI = 0; iI < $scope.aArticulos.length; iI++){

          var objArticulos = docXml.createElement('Articulos');
          objArticulos.setAttribute('Id', 'Articulos' + iI);
          objArticulos.setAttribute('RowOrder', iI);
          objArticulos.setAttribute('xmlns', null);


          var xmlTemp = docXml.createElement( 'Proveedor', '');
          xmlTextNode = docXml.createTextNode($scope.aUserSoriana[0].sUserWebService);
          xmlTemp.appendChild(xmlTextNode);
          objArticulos.appendChild(xmlTemp);

          var xmlTemp = docXml.createElement('Remision', '');
          xmlTextNode = docXml.createTextNode($scope.objDoc.sFactura.trim());
          xmlTemp.appendChild(xmlTextNode);
          objArticulos.appendChild(xmlTemp);

          var xmlTemp = docXml.createElement('FolioPedido', '');
          xmlTextNode = docXml.createTextNode($scope.objDoc.iFolio);
          xmlTemp.appendChild(xmlTextNode);
          objArticulos.appendChild(xmlTemp);

          var xmlTemp = docXml.createElement('Tienda', null);
          xmlTextNode = docXml.createTextNode($scope.objDoc.iScursal);
          xmlTemp.appendChild(xmlTextNode);
          objArticulos.appendChild(xmlTemp);

          var xmlTemp = docXml.createElement('Codigo', null);
          xmlTextNode = docXml.createTextNode($scope.aArticulos[iI].sCodigo);
          xmlTemp.appendChild(xmlTextNode);
          objArticulos.appendChild(xmlTemp);

          var xmlTemp = docXml.createElement('CantidadUnidadCompra', null);
          xmlTextNode = docXml.createTextNode($scope.aArticulos[iI].iCantidad);
          xmlTemp.appendChild(xmlTextNode);
          objArticulos.appendChild(xmlTemp);

          var xmlTemp = docXml.createElement('CostoNetoUnidadCompra', null);
          xmlTextNode = docXml.createTextNode($scope.objDoc.dTotal.toFixed(2));
          xmlTemp.appendChild(xmlTextNode);
          objArticulos.appendChild(xmlTemp);

          var xmlTemp = docXml.createElement('PorcentajeIEPS', null);
          xmlTextNode = docXml.createTextNode('0.00');
          xmlTemp.appendChild(xmlTextNode);
          objArticulos.appendChild(xmlTemp);

          var xmlTemp = docXml.createElement('PorcentajeIVA', null);
          xmlTextNode = docXml.createTextNode('0.00');
          xmlTemp.appendChild(xmlTextNode);
          objArticulos.appendChild(xmlTemp);

          docXml.documentElement.appendChild(objArticulos);

        }

        var serializer = new XMLSerializer();
        //alert (serializer.serializeToString (docXml));
        $scope.output =  ' <cfdi:Addenda>' + serializer.serializeToString ( docXml ) + ' </cfdi:Addenda>';
				$scope.output = $scope.output.replace('xmlns=\"\"', '');
				$scope.output = $scope.output.replace('xmlns=\"null\"', '');
				$scope.output = $scope.output.replace('xmlns=\"null\"', '');

        } catch (e) {

        } finally {

        }
      }



	}]);
