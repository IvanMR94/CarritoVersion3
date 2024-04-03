const contenedor = document.querySelector('#carrito');
const botones = document.querySelectorAll('.btn-primary');
const template = document.querySelector('#template');
const footer = document.querySelector('#footer');
const templateFooter = document.querySelector('#templateFooter');
const fragment = document.createDocumentFragment();


let carritoProducto = []; // cambio const por let para modificar el array.


const agregarProductoCarrito = (e) =>{ // recibo el evento anterior
    const producto = {
        titulo: e.target.dataset.fruta, // seleccciono el dato
        id: e.target.dataset.fruta,
        cantidad: 1,
        precio: parseInt(e.target.dataset.precio), //hay que parcearlo para que se convierta en numero.
    };

    const posicion = carritoProducto.findIndex( item =>{
        return item.titulo === producto.titulo;
    });

    if(posicion === -1){
        carritoProducto.push(producto);
    } else {
        carritoProducto[posicion].cantidad++;
    }
    
    mostrarCarrito();

};



const mostrarCarrito = () => {
    contenedor.textContent = '';

    carritoProducto.forEach( item  =>{
        const clone = template.content.cloneNode(true);
        clone.querySelector('.badge').textContent = item.cantidad;
        clone.querySelector('.text-uppercase .lead').textContent = item.titulo;
        clone.querySelector('.lead span').textContent = item.precio * item.cantidad;

        clone.querySelector('.btn-success').dataset.id = item.id;
        clone.querySelector('.btn-danger').dataset.id = item.id;

        fragment.appendChild(clone);
    });

    contenedor.appendChild(fragment);
    mostrarFooter(); // el total con btn de compra
}

const  mostrarFooter = () =>{
    footer.textContent = '';

    const total = carritoProducto.reduce((acc, current)=>{
        return acc + current.cantidad * current.precio;
    } , 0); // es un acumulador que parte de 0, y se suma el actual de los datos.

    const clone = templateFooter.content.cloneNode(true);
    clone.querySelector('.lead span').textContent = total;

    if (total === 0) return;
    
    footer.appendChild(clone);
};

const  btnAgregar = (e) =>{ //recibo el evento del click en el btn
    carritoProducto = carritoProducto.map(item => { // se mapea el item
        if(e.target.dataset.id === item.id){
            item.cantidad++;
        }
        return item;
    });
    mostrarCarrito();
};

const btnQuitar = (e) =>{
    carritoProducto = carritoProducto.filter(item => { // se filtra el item y sobreescribe el carrito
        if(e.target.dataset.id === item.id){
            if(item.cantidad > 0){ //aca se valida que mientras sea positivo, se elimine
                item.cantidad--;
                if (item.cantidad === 0) return; // de ser negativo o igual a cero, lo retornamos, es decir, se elimina del tablero
            };  
        };
        return item;
    });
    mostrarCarrito();
};

document.addEventListener('click', (e) =>{ // paso la "e" del evento
    if (e.target.matches('.btn-primary')){ // el matches toma datos de estios css 
        agregarProductoCarrito(e);
    };

    if(e.target.matches('.btn-success')){
        btnAgregar(e);
    };

    if(e.target.matches('.btn-danger')){
        btnQuitar(e);
    };
});

























//<template id="template">
//<li class="p-2 w-100 list-group-item d-flex justify-content-between align-items-center">
//<span class="lead">Fruta</span>
//<span class="badge bg-primary rounded-pill">1</span>
//</li>
//</template>