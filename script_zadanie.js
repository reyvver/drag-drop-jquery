$(document).ready( function () {

    let top_value = [4 , 8 , 16, 19 , 30, 35, 33, 26,  21 , 12, 5, 4 , 13, 23, 28, 18];
    let left_value= [ 6 , 18 , 24, 12 , 6, 16, 26 , 28 , 34 , 40, 48, 58 , 63 , 67, 79, 90];
    let obj;
    let n = 0; //кол-во игроков
    let number=1; //номер игрока, который ходит
    let check = false;
    let s_index;

    $('input').change(
        function () {
            n = $(this).val();
            $(this).animate({opacity: 0});
            $('p').animate({opacity: 0});
            $('#map').animate({opacity: 1});
            $('#history').animate({opacity: 1});


            setInterval(function() {
                $('#cub').animate({borderSpacing: -360}, {
                    step: function (now, fx) {
                        $(this).css('transform', 'rotate(' + now + 'deg)');
                    },
                    duration: 2000
                }, 'linear');
            }, 100);



            for (let i=1; i <= top_value.length; i++) // Создание ячеек пути
            {
                let cell_index = i-1;
                $('#map').append('<div class="step" id="step'+cell_index+'">'+(cell_index+1)+'</div>');
                $('#step'+cell_index).css('top',top_value[cell_index]+'vw');
                $('#step'+cell_index).css('left',left_value[cell_index]+'vw');
            }
            let steps = [];
            for (let i=1; i<=n; i++)
            {
                $('#map').append('<div class="player ui-widget-content">'+i+'</div>');
                steps.push(1);
            }
            let val = 2;
            $('.player').each(function () {
                $(this).css(
                    {   'left': 5+'vw',
                        'top': val+'vw'
                    });
                val+=2;
            });


            $('#cub').click(function () {
                if (check===false) {
                    let sides = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"];
                    s_index = Math.floor((Math.random() * 1000)) % sides.length;
                    check = true;
                    $('.step').each(function () {
                        $(this).css('background', 'white');
                    });
                    if (number > n) {
                        number = 1;
                    }
                    $(this).css(
                        {
                            'background': 'url(' + sides[s_index] + ')',
                            'background-size': 'cover'
                        });
                    $('#cub').html('');
                    $('#caption').text('Ходит игрок ' + number);

                    steps[number - 1] = steps[number - 1] + (s_index + 1);
                    let num = steps[number - 1] - 1;
                    if (steps[number - 1]>16)
                    {
                        steps[number - 1] = steps[number - 1] - (s_index + 1);
                        check = false;
                    }
                    else {
                        $('.player').each(function () {
                            let string_number = '' + number;
                            if ($(this).html() === string_number) {
                                obj = $(this);
                                $(this).draggable({
                                    containment: "parent",
                                    revert: true,
                                    revertDuration: 150,
                                });
                                $(this).draggable('enable');
                            }
                            else
                            {   $(this).css('z-index',0);}
                        });
                        $("#step" + num).droppable({
                                accept: obj,
                                create: function () {
                                    $(obj).css('z-index',5);
                                    $("#step" + num).css('background', '#FFC465');
                                },
                                drop: function () {
                                    $(this).css('background', 'white');
                                    $(this).droppable("destroy");
                                    check = false;
                                    $(obj).draggable('disable');
                                    if (num === 1)
                                    {
                                        $(obj).animate({left: $('#step8').css('left'), top: $('#step8').css('top')}, 600);
                                        $(obj).draggable({revert: false, containment: $("#step8")});
										steps[number-2] = 9;
                                    }
                                    if (num === 6)
                                    {
                                        $(obj).animate({left: $('#step3').css('left'), top: $('#step3').css('top')}, 600);
                                        $(obj).draggable({revert: false, containment: $("#step3")});
										steps[number-2] = 4
                                    }
                                    if (num === 14)
                                    {
                                        $(obj).animate({left: $('#step9').css('left'), top: $('#step9').css('top')}, 600);
                                        $(obj).draggable({revert: false, containment: $("#step9")});
										steps[number-2] = 10;
                                    }
                                    else
                                    {
                                        $(obj).draggable({revert: false, containment: $(this)});
                                    }
                                    if (steps[number - 2] === 16) {
                                        alert('Победил игрок ' + (number - 1) + ' !');
                                        $('#caption').text('Игра закончена. Победа за игроком № '+(number-1));
                                        check = '';
                                    }
                                }
                            }
                        );
                    }
                    number++;
                }
                else {
                    if (check===true ) {
                        alert('Сделайте ход!');
                    }
                }
            });

        }
    );

});