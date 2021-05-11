$('document').ready(() => {
    $.get('api/stock', (data) => {
        data.map((e, i) => { //get all stock
            $('#rowrow').append(`
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="card h-100">
                        <a href="#"><img class="card-img-top" src="http://cafef4.vcmedia.vn/` + getDay() + `/` + e.name + `/1year.png" alt=""></a>
                        <div class="card-body">
                            <h4 class="card-title">
                                <a href="#">` + e.name + `</a>
                            </h4>
                            <button type="button" class="btn btn-dark btn-rounded" id="addStock">ADD</button>
                        </div>
                    </div>
                </div>
        `);
        });
    });

    $.get('api/category', (data) => { //get category
        data.map((e, i) => {
            $('.list-group').append(`
                <a href="#" class="list-group-item">` + e.name + `</a>
            `);
        });
    });

    $('body').on('click', 'a.list-group-item', function() { //click category
        $('#rowrow').empty();
        var url = 'api/stock/category/' + $(this).text();
        $('.headerrow').empty().append(`<hr><h2>` + $(this).text() + `</h2>`);
        $.get(url, (data) => {
            data.map((e, i) => {
                $('#rowrow').append(`
                    <div class="col-lg-4 col-md-6 mb-4">
                        <div class="card h-100">
                        <a href="#"><img class="card-img-top" src="http://cafef4.vcmedia.vn/` + getDay() + `/` + e.name + `/1year.png" alt=""></a>
                            <div class="card-body">
                                <h4 class="card-title">
                                    <a>` + e.name + `</a>
                                </h4>
                                <button type="button" class="btn btn-dark btn-rounded" id="addStock">ADD</button>
                            </div>
                        </div>
                    </div>
                `);
            });
        });
    });

    $('body').on('click', '.btn-primary', function() { //click buttun search
        $('#rowrow').empty();
        $('.headerrow').empty();
        $.get('api/stock/' + $('.search_input').val(), (data) => {
            if (data.length == 0) {
                $('#rowrow').append(`<div class="col-lg-6 col-md-10 mb-8"><h2>Không tìm thấy!</h2></div>`);
            }
            data.map((e, i) => {
                $('#rowrow').append(`
                    <div class="col-lg-4 col-md-6 mb-4">
                        <div class="card h-100">
                        <a href="#"><img class="card-img-top" src="http://cafef4.vcmedia.vn/` + getDay() + `/` + e.name + `/1year.png" alt=""></a>
                            <div class="card-body">
                                <h4 class="card-title">
                                    <a>` + e.name + `</a>
                                </h4>
                                <button type="button" class="btn btn-dark btn-rounded" id="addStock">ADD</button>
                            </div>
                        </div>
                    </div>
                `);
            });
        });
    });

    $('body').on('keypress', '.search_input', function(e) { //enter to search
        var key = e.which;
        if (key == 13) {
            $('#rowrow').empty();
            $('.headerrow').empty();
            $.get('api/stock/' + $('.search_input').val(), (data) => {
                if (data.length == 0) {
                    $('#rowrow').append(`<div class="col-lg-6 col-md-10 mb-8"><h2>Không tìm thấy!</h2></div>`);
                }
                data.map((e, i) => {
                    $('#rowrow').append(`
                    <div class="col-lg-4 col-md-6 mb-4">
                        <div class="card h-100">
                        <a href="#"><img class="card-img-top" src="http://cafef4.vcmedia.vn/` + getDay() + `/` + e.name + `/1year.png" alt=""></a>
                            <div class="card-body">
                                <h4 class="card-title">
                                    <a>` + e.name + `</a>
                                </h4>
                                <button type="button" class="btn btn-dark btn-rounded" id="addStock">ADD</button>
                            </div>
                        </div>
                    </div>
                `);
                });
            });
        }
    });

    $('body').on('keypress', '.update_input', function(e) { //enter to update
        var key = e.which;
        if (key == 13) {
            var description = $(this).val();
            var nameStock = $(this).parent('.card-body').children('.card-title').text();
            $(this).replaceWith(`<p class="card-text" onClick="render(this)" >` + description + `</p>`);
            $.post('api/user/stock/update', { nameStock: nameStock, newDescription: description }, (data, status) => {
                alert('update thành công!');
            });
        }
    });

    $('body').on('click', '#myStock', function(e) { //click to render list userstock
        $('#rowrow').empty();
        $('.headerrow').empty();
        let name = $('#username').text();
        $('.headerrow').empty().append(`<hr><h2>` + $(this).text() + `</h2>`);
        $.get('api/user/stock/' + name, (data, err) => {
            data.map((e, i) => {
                $('#rowrow').append(`
                    <div class="col-lg-4 col-md-6 mb-4">
                        <div class="card h-100">
                        <a href="#"><img class="card-img-top" src="http://cafef4.vcmedia.vn/` + getDay() + `/` + e.name + `/1year.png" alt=""></a>
                            <div class="card-body">
                                <h4 class="card-title">
                                    <a>` + e.name + `</a>
                                </h4>
                                <p class="card-text" onClick="render(this)" >` + e.description + `</p>
                                <button type="button" class="btn btn-dark btn-rounded" id="deleteStock" >DELETE</button>
                            </div>
                        </div>
                    </div>
                `);
            });
        });
    });

    $('body').on('click', '#addStock', function(e) { //click buttun search
        var nameStock = $(this).parent('.card-body').children('.card-title').text()
        $.post('api/user/stock/add', { nameStock: nameStock }, (data, status) => {
            alert('Thêm thành công!');
        });
    });

    $('body').on('click', '#deleteStock', function(e) { //click buttun search
        var nameStock = $(this).parent('.card-body').children('.card-title').text();
        $(this).parent('.card-body').parent().parent().remove()
        $.post('api/user/stock/delete', { nameStock: nameStock }, (data, status) => {
            alert('delete thành công!');
        });
    });
});

var getDay = () => {
    var day = new Date();
    var m = day.getMonth() + 1;
    if (m < 10) {
        m = '0' + m;
    }
    var d = day.getDate();
    if (d != 1) {
        d -= 1;
    }
    if (d < 10) {
        d = '0' + d
    }
    return day.getFullYear().toString() + m + d;
}

var render = p => {
    $(p).replaceWith('<input class="update_input" type="text" placeholder="..." />');
}