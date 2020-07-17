const toCurrency = price => new Intl.NumberFormat('ru-RU', {
    currency: 'rub',
    style: 'currency'
}).format(price)

document.querySelectorAll('.price').forEach(el => {
    el.textContent = toCurrency(el.textContent) 
})

const $card = document.querySelector('#card');
if ($card) {
    $card.addEventListener('click', async e => {
        if (e.target.classList.contains('js-remove')) {
            const id = e.target.dataset.id;

            const response = await fetch('/card/delete/' + id, {
                method: 'delete'
            })
            const card = await response.json();
            if (card.courses.length) {
                const html = card.courses.map(el => {
                    return `<tr>
                            <td>${el.title}</td>
                            <td>${el.count}</td>
                            <td><button class="waves-effect waves-red red lighten-2 btn-small js-remove" data-id="${el.id}">Delete</button></td>
                        </tr>`
                });
                html.join(' ');
                $card.querySelector('tbody').innerHTML = html;
                $card.querySelector('.price').textContent = toCurrency(card.totalPrice);
            } else {
                $card.innerHTML = '<p>Card is empty</p>'
            }

        }
    })
}