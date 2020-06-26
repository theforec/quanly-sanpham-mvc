class Model {
    constructor() {
        this.listItems = JSON.parse(localStorage.getItem("listItems")) || [];
    }

    saveStorage() {
        localStorage.setItem("listItems", JSON.stringify(this.listItems));
    }

    addItem(item) {
        this.listItems.push(item);
        this.saveStorage();
    }

    editItem(item) {
        this.listItems.splice(1, 1, item);
        this.saveStorage();
    }

    deleteItem(item) {
        this.listItems = this.listItems.filter(sp => sp.idItem != item.idItem);
        this.saveStorage();
    }
}

class View {
    constructor() {
        this.tableContent = document.getElementById("table");
        this.listItems = [];
    }

    appendSearchBar() {
        var header = document.getElementById("header");
        var caption = document.createElement("div");
        caption.id = "caption";
        caption.innerText = "Quản lý sản phẩm MVC"
        var searchBar = document.createElement("div");
        searchBar.id = "searchBar";
        var addButton = document.createElement("button");
        addButton.type = "button";
        addButton.innerHTML = "Thêm sản phẩm"
        addButton.addEventListener("click", this.addItem);
        var searchInput = document.createElement("input");
        searchInput.placeholder = "Tìm kiếm sản phẩm";
        searchInput.id = "searchInput";
        var searchButton = document.createElement("button");
        searchButton.type = "button";
        searchButton.innerHTML = "Tìm kiếm";
        searchButton.addEventListener("click", this.searchItems);

        searchBar.append(addButton, searchInput, searchButton);
        header.append(caption, searchBar);

        // var str = `<div id="caption">Quản lý sản phẩm MVC</div>
        //             <div id="searchBar">
        //                 <button id="buttonAddItem" type="button" onclick="${this.addItem}">
        //                     Thêm sản phẩm</button>
        //                 <input type="text" id="searchName" placeholder="Tìm kiếm sản phẩm" />
        //                 <button type="button" id="searchButton" >
        //                     Tìm kiếm</button>
        //             </div>`
        // var btn = document.getElementById("buttonAddItem");
        // btn.addEventListener("click", this.addItem);
        // document.getElementById("searchButton").addEventListener("click", this.searchItems);

        // header.insertAdjacentHTML("beforeend", str);
    }

    appendTable() {
        //create label
        var tHead = `<thead>  
                        <tr id="label">
                            <th>Mã sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Ghi chú</th>
                            <th>Đơn giá</th>
                            <th>Action</th>
                        </tr> 
                    </thead>`
        this.tableContent.insertAdjacentHTML("beforeend", tHead);

        //create table
        var _length = this.listItems.length;
        if (_length > 0) {
            //render
            for (var i = 0; i < _length; i++) {
                var ct = this.renderItem(this.listItems[i]);
                this.tableContent.append(ct);
            }
        }
        else {
            //empty
            var emptyTr = `<tr><th colspan="5" class="empty">Không có sản phẩm</th></tr>`
            this.tableContent.insertAdjacentHTML("beforeend", emptyTr);
        }
    }

    appendModal() {
        //<div id="addModal">
        var modal = document.createElement("div");
        modal.id = "addModal";
        var modalContent = document.createElement("div");
        modalContent.id = "modal-content";

        //<div id="modal-header">
        var modalHeader = document.createElement("div");
        modalHeader.id = "modal-header";
        var spanClose = document.createElement("span");
        spanClose.className = "close";
        spanClose.addEventListener("click", this.closeModal);
        spanClose.innerHTML = "&times;";
        var h3 = document.createElement("h3");
        h3.id = "labelAddItem";
        h3.innerHTML = "Thêm sản phẩm";
        modalHeader.append(spanClose, h3);

        var modalBody = document.createElement("div");
        modalBody.id = "modal-body";
        //<form action="" id="inputData">
        var formData = document.createElement("form");
        formData.id = "inputData";
        var inId = document.createElement("input");
        inId.id = "idItem";
        inId.type = "text";
        inId.placeholder = "Mã sản phẩm";
        var inName = document.createElement("input");
        inName.id = "nameItem";
        inName.type = "text";
        inName.placeholder = "Tên sản phẩm";
        var inPrice = document.createElement("input");
        inPrice.id = "priceItem";
        inPrice.type = "text";
        inPrice.placeholder = "Đơn giá";
        var inNote = document.createElement("input");
        inNote.id = "noteItem";
        inNote.type = "text";
        inNote.placeholder = "Ghi chú";
        formData.append(inId, inName, inPrice, inNote);

        //<form action="" id="formButton">
        var formButton = document.createElement("form");
        formButton.id = "formButton";
        var btnConfirm = document.createElement("button");
        btnConfirm.type = "button";
        btnConfirm.innerHTML = "Xác nhận";
        btnConfirm.addEventListener("click", this.confirm);
        var btnClear = document.createElement("button");
        btnClear.type = "button";
        btnClear.addEventListener("click", this.clear);
        btnClear.innerHTML = "Thử lại";
        formButton.append(btnConfirm, btnClear);

        modalBody.append(formData, formButton);

        modalContent.append(modalHeader, modalBody);
        modal.append(modalContent);

        document.getElementById("header").append(modal);
    }

    renderItem(item) {
        var itemTr = document.createElement("tr");
        var idItem = document.createElement("td");
        idItem.textContent = `${item.idItem}`;
        var nameItem = document.createElement("td");
        nameItem.textContent = `${item.nameItem}`;
        var noteItem = document.createElement("td");
        noteItem.textContent = `${item.noteItem}`;
        var priceItem = document.createElement("td");
        priceItem.textContent = `${item.priceItem}`;
        priceItem.className = "donGia";

        var action = document.createElement("td");
        action.className = "action";
        var aEdit = document.createElement("input");
        aEdit.type = "button";
        aEdit.value = "Sửa";
        // aEdit.addEventListener("click", this.editItem[index]);
        var aDelete = document.createElement("input");
        aDelete.type = "button";
        aDelete.value = "Xoá";
        // aDelete.addEventListener("click", this.deleteItem);

        action.append(aEdit, " - ", aDelete);
        itemTr.append(idItem, nameItem, noteItem, priceItem, action);

        return itemTr;
    }

    render() {
        this.appendSearchBar();
        this.appendModal();
        this.appendTable();
    }

    reRender() {
        this.tableContent.innerHTML = "";
        this.appendTable();
    }

    changeLabel(newLabel) {
        document.getElementById("labelAddItem").innerHTML = newLabel;
    }
}

class Controller {
    constructor(model, view) {
        this.status = "default";
        this.model = model;
        this.view = view;
        this.view.tableContent.addEventListener("click", this.tableClick);
        this.view.listItems = this.model.listItems;
        this.view.addItem = this.addItem;
        this.view.searchItems = this.searchItems;
        this.view.clearTable = this.clearTable;
        this.view.confirm = this.confirm;
        this.view.clear = this.clearModal;
        this.view.closeModal = this.closeModal;
        this.view.render();
        this.idItem = document.getElementById("idItem");
        this.nameItem = document.getElementById("nameItem");
        this.priceItem = document.getElementById("priceItem");
        this.noteItem = document.getElementById("noteItem");
    }

    tableClick = (e) => {
        if (!e) e = window.event;
        this.rowTarget = e.target.parentNode.parentNode;
        var index = this.rowTarget.rowIndex;
        var _item = this.model.listItems[index - 1];
        if (e.target.value == "Sửa") {
            this.editItem(_item);
        }
        if (e.target.value == "Xoá") {
            this.view.tableContent.deleteRow(index);
            this.model.deleteItem(_item);
        }
    }

    addItem = () => {
        this.status = "adding";
        this.clearModal();
        this.view.changeLabel("Thêm sản phẩm");
        this.idItem.readOnly = false;
        this.showModal();
    }

    editItem = (_item) => {
        this.status = "editing";
        this.view.changeLabel("Sửa sản phẩm");
        this.showModal();
        this.idItem.readOnly = true;
        this.idItem.value = _item.idItem;
        this.nameItem.value = _item.nameItem;
        this.priceItem.value = _item.priceItem;
        this.noteItem.value = _item.noteItem;
    }

    showModal() {
        document.getElementById("addModal").style.display = "block";
    }

    closeModal() {
        document.getElementById("addModal").style.display = "none";
    }

    getModalValue() {
        var item = {
            idItem: this.idItem.value,
            nameItem: this.nameItem.value,
            priceItem: this.priceItem.value,
            noteItem: this.noteItem.value,
        }
        return item;
    }

    confirm = () => {
        var item = this.getModalValue();
        var errorInfo = 0;
        //validate form
        if (item.idItem == "" || item.nameItem == "" || item.priceItem == "") {
            errorInfo++;
            var string = "";
            if (item.idItem == "") string += "Mã sản phẩm,";
            if (item.nameItem == "") string += " Tên sản phẩm,";
            if (item.priceItem == "") string += " Đơn giá,";
            string = string.substr(0, string.length - 1);
            string += " không được bỏ trống";
            alert(string);
        }
        //info correct
        if (errorInfo === 0) {
            //adding
            if (this.status == "adding") {
                var errorId = 0;
                this.model.listItems.find(sp => {
                    if (item.idItem == sp.idItem)
                        errorId++;
                });
                if (errorId != 0) {
                    alert("Mã sản phẩm không được trùng");
                    return;
                }
                this.model.addItem(item);
                this.view.tableContent.append(this.view.renderItem(item));
            }
            //editing
            else {
                console.log("editing");
                this.model.editItem(item);
                //replace row
                var newRow = this.view.renderItem(item);
                this.rowTarget.parentNode.replaceChild(newRow, this.rowTarget);
            }
            // this.clearModal();
            this.closeModal();
        }
    }

    clearModal = () => {
        this.idItem.value = "";
        this.nameItem.value = "";
        this.priceItem.value = "";
        this.noteItem.value = "";
    }

    clearTable = () => {
        this.view.listItems = this.model.listItems;
        document.getElementById("table").innerHTML = "";
    }

    searchItems = () => {
        console.log("search clicked");
        var txtSearch = document.getElementById("searchInput");
        var listItemsFiltered = [];
        var name = txtSearch.value;
        if (name.length == 0) {
            this.status = "default";
            updateDataTable(listItems);
            return;
        }
        status = "filtering";
        listItemsFiltered = this.model.listItems.filter(sp =>
            sp.idItem.toLowerCase().search(name) != -1 || sp.nameItem.toLowerCase().search(name) != -1 ||
            sp.priceItem.toLowerCase().search(name) != -1 || sp.noteItem.toLowerCase().search(name) != -1)

        txtSearch.value = name;
        updateDataTable(listItemsFiltered);

    }
}

const hic = new Controller(new Model(), new View());