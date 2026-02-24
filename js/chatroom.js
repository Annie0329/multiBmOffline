$(document).ready(function () {

    // REGISTER DOM ELEMENTS
    const $messageField = $('#messageField');
    const $messageList = $('#messageList');
    const $sendButton = $('#sendButton');
    const messageList = $('.messageList');
    var id = $('#id').val();
    var idDefault = `<li class="messageR">
                <div class="messageTextR">
                    <p>they go up to the 2F now</p>
                    <p class="chatUsername">1F</p>
                </div>
            </li>
            <li class="messageL">
                <div class="messageTextL">
                    <p>okay!</p>
                    <p class="chatUsername">2F</p>
                </div>
            </li>
            <li class="messageL">
                <div class="messageTextL">
                    <p>so fast</p>
                    <p class="chatUsername">3F</p>
                </div>
            </li>`
    var id1 = `<li class="messageR">
        <div class="messageTextR">
            <p>chat for id1</p>
            <p class="chatUsername">1F</p>
        </div>
    </li>`
    var id2 = `<li class="messageR">
        <div class="messageTextR">
            <p>chat for id2</p>
            <p class="chatUsername">2F</p>
        </div>
    </li>`

    $('#saveButton').on('click', function () {
        id = $('#id').val();
        if (id == "idDefault") {
            $messageList.html(idDefault);
        }
        if (id == "id1") {
            $messageList.html(id1);
        }
        else if (id == "id2") {
            $messageList.html(id2);
        }
        changeUI();
    });

    //更改名稱時換UI
    $('#nameField').on('change', changeUI);
    function changeUI() {
        const selectedUser = $('#nameField').val();

        $('#messageList li').each(function () {
            const messageUser = $(this).find('.chatUsername').text().trim();

            if (messageUser === selectedUser) {
                $(this)
                    .removeClass('messageL')
                    .addClass('messageR');

                $(this).find('.messageTextL')
                    .removeClass('messageTextL')
                    .addClass('messageTextR');
            } else {
                $(this)
                    .removeClass('messageR')
                    .addClass('messageL');

                $(this).find('.messageTextR')
                    .removeClass('messageTextR')
                    .addClass('messageTextL');
            }
        });

        messageList.scrollTop(messageList[0].scrollHeight);
    }
    // LISTEN FOR KEYPRESS EVENT
    $messageField.keypress(function (e) {
        if (e.keyCode == 13) {
            $sendButton.mousedown();
        }
    });
    //按按鈕傳訊息
    $sendButton.mousedown(function (e) {
        e.preventDefault();
        //訊息不是空的才傳訊息
        if ($messageField.val() != "") {
            nameValName = $('#nameField').val();

            let messageItem = `
            <li class=messageR>
              <div  class="messageTextR">
                <p>${$messageField.val()}</p>
                <p class="chatUsername">${nameValName}</p>
              </div>
            </li>
            `
            if (id == "idDefault") {
                idDefault = idDefault + messageItem;
                $messageList.html(idDefault);
            }
            if (id == "id1") {
                id1 = id1 + messageItem;
                $messageList.html(id1);
            }
            else if (id == "id2") {
                id2 = id2 + messageItem;
                $messageList.html(id2);
            }
            changeUI()
            $messageField.val('')
            //訊息會自動滑到底
            messageList.scrollTop(messageList[0].scrollHeight);
        }
    })
});
