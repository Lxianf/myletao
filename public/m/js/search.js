$(function () {
    addHistory()
    setHistory()
    deleteHistory();
    clearHistory();
})

function addHistory() {
    $('.btn-search').on('click', function () {
        // console.log($('.search-input').val())
        var search = $('.search-input').val();
        if (!search) {
            alert('请输入你要搜索的商品');
            return;
        }
        var historyData = localStorage.getItem('historyData');
        if (historyData) {
            historyData = JSON.parse(historyData);
        } else {
            historyData = []
        }
        if (historyData.indexOf(search) == -1) {
            historyData.push(search)
            localStorage.setItem('historyData', JSON.stringify(historyData));
            setHistory()
        }
        $('.search-input').val('')
    })
}

function setHistory() {
    var historyData = localStorage.getItem('historyData');
    if (historyData) {
        historyData = JSON.parse(historyData);
    } else {
        historyData = []
    }
    historyData = historyData.reverse()
    var html = template('historyDataTmp', {
        'rows': historyData
    })
    $('.search-history-list ul').html(html)
}


function deleteHistory() {
    $('.search-history-list').on('click', '.btn-delete', function () {
        var history = $(this).parent().data('history');
        var historyData = localStorage.getItem('historyData');
        if (historyData) {
            historyData = JSON.parse(historyData);
        } else {
            historyData = []
        }
        var historyIndex = historyData.indexOf(history + "");
        // console.log(historyIndex);
        historyData.splice(historyIndex, 1);
        localStorage.setItem('historyData', JSON.stringify(historyData));
        setHistory();
    })
}


function clearHistory() {
    $('.btn-clear').on('click', function () {
        localStorage.setItem('historyData', '');
        setHistory(0);
    })
}