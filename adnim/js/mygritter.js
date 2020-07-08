var mygritter = {
     errorgrit : function (title,text) {
        $.gritter.add({
            title: title,
            text: text,
            class_name: 'gritter-error ' + ' gritter-light',
            time: '5000',

        });

        // return false;
    },
     successgrit : function (title,text) {
          
    $.gritter.add({
        title: title,
        text: text,
        class_name: 'gritter-success ' + ' gritter-light',
        time: '5000',

    });

    // return false;
}
}

