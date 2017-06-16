$(function () {
    //获取验证码事件
    var $getNum = $('#getNum');
    var flag = true;
    $getNum.click(function () {
        var $this = $(this);
        if (flag == true) {
            flag = false;
            $this.addClass('active');
            $this.html('<i>60</i>s后获取');
            Countdown($this);
            setTimeout(function () {
                $this.removeClass('active');
                $this.html('获取验证码');
                flag = true;
                timer = null;

            },60000);
        } else {
            return false;
        }
    });
    function Countdown(obj) {
        var now = 60;
        var timer = null;
        timer = setInterval(function () {
            if (now>1) {
                now -= 1;
                obj.html('<i>'+ now +'</i>s后获取');
            }
        }, 1000);
    }
    //表单验证
    var subm = $('#subm');
    subm.click(function () {
        var numsVal = $('#nums-input').val()
            passVal = $('#pass').val(),
            repassVal = $('#repass').val(),
            nameVal = $('#name').val(),
            idCard = $('#idCard').val();
        if (numsVal =='') {
            $('.modal-bg.wr').show();
            return false;
        }
        if (passVal != repassVal || nameVal == '' || idCard == '' ) {
            $('.modal-bg.fail').show();
            return false;
        }
        $('.modal-bg.suc').show();
    });

    //模态框
    var $modal = $('.modal-bg');
    var $close = $('.modal_close');
    $close.each(function (i) {
        var $this_p = $(this).parents('.modal-bg');
        $(this).click(function () {
            $this_p.css({
                display: 'none'
            });
        });
        
    });
    //验证码验证
    var $numsPic =  $('#numsPic');
    var $numsValue = $('#numsValue');
    var $nextBtn = $('#next');
    $nextBtn.click(function () {
        var numsPic = $numsPic.html();
        var numsValue = $numsValue.val();
        if (numsPic != numsValue) {
            return false;
        } else {
            window.location = "./reset2.html"
        }
    });
});