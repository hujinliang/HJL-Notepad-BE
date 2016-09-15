module.exports = {
    port:process.env.PORT || 8000,
    mongo:{
        uri:'mongodb://localhost/hjl-notepad'
    },
    session:{
        cookie:  {domain:'.hjlclould.cn',maxAge: 60000*5}
    }
}