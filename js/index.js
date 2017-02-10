$('.content>ul>li').hover(
    function () {
      $(this).css({
          "boxShadow":"0 0 10px #333"
      });

    },function () {
        $(this).css({
            "boxShadow": "0 0 5px #333"
        });

    }
);
