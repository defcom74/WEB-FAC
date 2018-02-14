angular.module('facturaApp', [  'ngResource', 'mgcrea.ngStrap', 'ngAnimate'])
.config(function ($httpProvider){
//send the info in the same way that jquery
  $httpProvider.defaults.trasformRequest = function(data){
    if (data === undefine) {
      return data;
    }
    return serialize(data);
  };
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-wwww-form-urlencoded; charset-UTF-8';

})
.factory('userDatos', ['$resource', function($resource){
	return $resource('../api/factura/Web/UserById/:iUserId', {iUserId: '@_iUserId'} , {

	});
}])
.factory('userSoriana', ['$resource', function($resource){
	return $resource('../api/factura/Web/SorianaDataByUserId/:iUserId', {iUserId: '@_iUserId'} , {

	});
}])
.factory('sorReportes', ['$resource', function($resource){
	return $resource('../api/factura/Web/ReportsBySorinanaId/:iId',
  {iId: '@_iId'} , {

	});
}])
.factory('sorDocumentos', ['$resource', function($resource){
	return $resource('../api/factura/Web/DocumentsByReportId/:iId/DocId/:iDocId/SorianaId/:iSorId',
  {iId: '@_iId', iDocId: '@_iDocId', iSorId: '@_iSorId'} , {

	});
}])
.factory('sorArticulos', ['$resource', function($resource){
	return $resource('../api/factura/Web/ArticulosByDocumentId/:iId',
  {iId: '@_iId'} , {

	});
}])
