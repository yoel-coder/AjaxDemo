$(() => {

    const modal = new bootstrap.Modal($(".modal")[0]);

    const refreshPeople = (cb) => {
        $("tbody tr:gt(0)").remove();
        $("#spinner-row").show();
        $.get('/home/getpeople', function (people) {
            $("#spinner-row").hide();
            people.forEach(person => {
                $("tbody").append(`<tr>
                <td>${person.firstName}</td>
                <td>${person.lastName}</td>
                <td>${person.age}</td>
                 <td>
                    <button class='btn btn-warning' data-person-id='${person.id}'>Edit</button>
                    <button class='btn btn-danger ml-3' data-person-id='${person.id}'>Delete</button>
                </td>
                </tr>`);
            })
            if (cb) {
                cb();
            }
        });

    }

    refreshPeople();

    $("#show-add").on('click', function () {
        $("#firstName").val('');
        $("#lastName").val('');
        $("#age").val('');
        $(".modal-title").text('Add Person');
        $("#save-person").show();
        $("#update-person").hide();
        modal.show();
    })

    $("#save-person").on('click', function () {
        const firstName = $("#firstName").val();
        const lastName = $("#lastName").val();
        const age = $("#age").val();

        $.post('/home/addperson', {
            firstName: firstName,
            lastName: lastName,
            age: age
        }, function () {
            refreshPeople();
            modal.hide();

        });
    });

    $("table").on('click',".btn-danger", function () {
        console.log("hellomm")
        const id = $(this).data('person-id')
        $.post("/home/deletePerson", { id }, function () { refreshPeople() })
    })



    $("table").on("click", ".btn-warning", function () {
        console.log("hello");
        const id = $(this).data('person-id')
        $.get('/Home/GetPersonById', { id }, function (person) {
            $("#firstName").val(person.firstName)
            $('#lastName').val(person.lastName)
            $("#age").val(person.age)
            $('#save-person').hide()
            $('#update-person').show()
            $('.modal-title').text('Edit-person')
            $(".modal").data('person-id', id);
            modal.show();
        })

    })
    $("#update-person").on('click', function () {
       
        const firstName = $('#firstName').val()
        const lastname = $('#lastName').val()
        const age = $('#age').val()
        console.log("kkk")
        const id = $(".modal").data('person-id');   
        $.post('/home/UpdatePerson', {
            firstName: firstName,
            lastname: lastname,
            age: age,
            id: id
        },
            function () {
                refreshPeople()
                modal.hide()
            })

            
    })





})