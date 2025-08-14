// Menú móvil
document.addEventListener('DOMContentLoaded', function(){
  var btn = document.getElementById('btn-menu');
  var nav = document.getElementById('nav');
  if(btn){
    btn.addEventListener('click', function(){
      if(nav.style.display === 'block'){ nav.style.display = ''; }
      else { nav.style.display = 'block'; }
    });
  }

  // Filtros catálogo (simple)
  var reset = document.getElementById('reset-filters');
  if(reset){
    reset.addEventListener('click', function(){ 
      document.getElementById('filter-nivel').value = '';
      document.getElementById('filter-formato').value = '';
      filterCatalog();
    });
    document.getElementById('filter-nivel').addEventListener('change', filterCatalog);
    document.getElementById('filter-formato').addEventListener('change', filterCatalog);
  }

  function filterCatalog(){
    var nivel = document.getElementById('filter-nivel').value;
    var formato = document.getElementById('filter-formato').value;
    var items = document.querySelectorAll('#catalog-list .card');
    items.forEach(function(it){
      var ok = true;
      if(nivel && it.dataset.nivel !== nivel) ok = false;
      if(formato && it.dataset.formato !== formato) ok = false;
      it.style.display = ok ? '' : 'none';
    });
  }

});
