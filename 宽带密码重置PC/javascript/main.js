//表单验证插件
;(function ($) {
    var pluginName = 'validation',
        defaults = {};

    $.fn[ pluginName ] = function (options) {
        var settings = $.extend({}, defaults, options);
        var el = settings.el;
        var reg = settings.reg;
        var tip = settings.tip;
      
	    $.each(el, function (key, value) {
            var _key = key;
            var $el = $(value);
            $el.on('change', function () {
                var str = $el.val();
                var $tip = $el.nextAll(tip);
                var $this = $(this);
                var elId = $this.attr('id');
                if (elId == 'repass') {
                    var pass = $('#pass').val();
                    if (str != pass) {
                        $tip.attr('class','tip');
                        $tip.addClass('tip-wr');
                        setText(elId, $tip);
                    } else {
                        $tip.html('');
                        $tip.attr('class','tip');
                        $tip.addClass('tip-right');
                    }
                }
                $.each(reg, function (key, value) {
                    if (typeof value == 'string') {
                        return false;
                    } else {
                        if (key == _key) {
                            var flag = value.test(str);
                            console.log(flag)
                            if (flag) {
                                $tip.html('');
                                $tip.attr('class','tip');
                                $tip.addClass('tip-right');
                            } else {
                                $tip.attr('class','tip');
                                $tip.addClass('tip-wr');
                                setText(elId, $tip); 
                            }
                        }
                    }
                });
            });
        });
    }
function setText(elId, tip) {
    switch (elId) {
        case 'idCard':
            tip.html('身份证号输入错误');
            break;
        case 'phone':
            tip.html('手机号输入错误');
            break;
        case 'nums':
            tip.html('验证码输入错误');
            break;
        case 'repass':
            tip.html('密码输入不一致');
            break;
        default:
            tip.html('');
    }
}
})(jQuery);
$(function () {
    //验证码UI
    var $getNum = $('#getNum');
    var flag = true;
    $getNum.click(function () {
        if (flag == true) {
            var $this = $(this);
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
    $('.form').validation({
        el: {
            name: '#name',
            idCard: '#idCard',
            phone: '#phone',
            nums: '#nums',
            repass: '#repass'
        },
        reg: {
            name: /.*/,
            idCard: /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/,
            phone: /^1[34578]\d{9}$/,
            nums: /\d{6}/,
            repass: '#pass'
        },
        tip:'.tip'
    });
});