document.addEventListener('DOMContentLoaded', function () {
    var options = {
        data: {
            "Dato": null,
        }
    }
    var elems = document.querySelectorAll('.autocomplete');
    var instances = M.Autocomplete.init(elems, options);
});