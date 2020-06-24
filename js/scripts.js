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
        //do something
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
        console.log("View constructor()");

        this.tableContent = document.getElementById("table");

        this.listItems = [];
        this.clearTable = function () { };
        this.addItem = function () { };
        this.editItem = function () { };
        this.deleteItem = function () { };
        this.searchItem = function () { };
        this.confirm = function () { };
        this.clear = function () { };
        this.closeModal = function () { };
    }

    appendHeader() {
        var header = document.getElementById("header");
        var caption = document.createElement("div");
        caption.id = "caption";
        caption.innerText = "Quản lý sản phẩm"
        var searchBar = document.createElement("div");
        searchBar.id = "searchBar";
        var addButton = document.createElement("button");
        addButton.type = "button";
        addButton.className = "buttonAddItem";
        addButton.innerHTML = "Thêm sản phẩm"
        addButton.addEventListener("click", this.addItem);
        var searchInput = document.createElement("input");
        // searchInput.id = "searchName";
        searchInput.placeholder = "Tìm kiếm sản phẩm";
        var searchButton = document.createElement("button");
        searchButton.type = "button";
        searchButton.innerHTML = "Tìm kiếm";
        searchButton.addEventListener("click", this.searchItem);

        searchBar.append(addButton, searchInput, searchButton);
        header.append(caption, searchBar);
    }

    appendTable() {
        //create label
        var label = document.createElement("tr");
        label.id = "label";
        var labelId = document.createElement("td");
        labelId.textContent = "Mã sản phẩm";
        var labelName = document.createElement("td");
        labelName.textContent = "Tên sản phẩm";
        var labelNote = document.createElement("td");
        labelNote.textContent = "Ghi chú";
        var labelPrice = document.createElement("td");
        labelPrice.textContent = "Đơn giá";
        var labelAction = document.createElement("td");
        labelAction.textContent = "Action";

        label.append(labelId, labelName, labelNote, labelPrice, labelAction);
        this.tableContent.append(label);

        //create table
        var _length = this.listItems.length;
        if (_length > 0) {
            //render
            for (var i = 0; i < _length; i++) {
                var ct = this.renderItem(this.listItems[i], i);
                this.tableContent.append(ct);
            }
        }
        else {
            //empty
            var emptyTr = document.createElement("tr");
            var emptyTh = document.createElement("th");
            emptyTh.colSpan = 5;
            emptyTh.className = "empty";
            emptyTh.textContent = "Không có sản phẩm";
            emptyTr.append(emptyTh);
            this.tableContent.append(emptyTr);
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

    renderItem(item, index) {
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
        var aEdit = document.createElement("a");
        aEdit.href = "#";
        aEdit.textContent = "Sửa";
        aEdit.addEventListener("click", this.editItem);
        var aDelete = document.createElement("a");
        aDelete.href = "#";
        aDelete.textContent = "Xoá";
        aDelete.addEventListener("click", this.deleteItem);

        action.append(aEdit, " | ", aDelete);

        itemTr.append(idItem, nameItem, noteItem, priceItem, action);

        return itemTr;
    }

    render() {
        this.appendHeader();
        this.appendModal();
        this.appendTable();
    }

    reRender() {
        this.clearTable();
        this.appendTable();
    }
}

class Controller {
    constructor(model, view) {
        // console.log("Controller constructor()");
        this.model = model;
        this.view = view;
        this.view.listItems = this.model.listItems;
        this.view.addItem = this.showModal;
        this.editItem = this.editItem.bind(this);
        this.view.editItem = this.editItem;
        this.deleteItem = this.deleteItem.bind(this);
        this.view.deleteItem = this.deleteItem;
        this.searchItem = this.searchItem.bind(this);
        this.view.searchItem = this.searchItem;
        this.clearTable = this.clearTable.bind(this);
        this.view.clearTable = this.clearTable;
        this.confirm = this.confirm.bind(this);
        this.view.confirm = this.confirm;
        this.clear = this.clear.bind(this);
        this.view.clear = this.clear;
        this.view.closeModal = this.closeModal;
        this.view.render();
        this.idItem = document.getElementById("idItem");
        this.nameItem = document.getElementById("nameItem");
        this.priceItem = document.getElementById("priceItem");
        this.noteItem = document.getElementById("noteItem");
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

    confirm() {
        var _item = this.getModalValue();
        var flag = 0;
        //validate form
        if (_item.idItem == "" || _item.nameItem == "" || _item.priceItem == "") {
            flag++;
            var string = "";
            if (_item.idItem == "") string += "Mã sản phẩm,";
            if (_item.nameItem == "") string += " Tên sản phẩm,";
            if (_item.priceItem == "") string += " Đơn giá,";
            string = string.substr(0, string.length - 1);
            string += " không được bỏ trống";
            alert(string);
        }
        if (flag === 0) { //info correct
            var item = {
                idItem: this.idItem.value,
                nameItem: this.nameItem.value,
                priceItem: this.priceItem.value,
                noteItem: this.noteItem.value,
            }
            let flag2 = 0;
            this.model.listItems.find(sp => {
                if (item.idItem == sp.idItem)
                    flag2++;
            });
            if (flag2 != 0) {
                alert("Mã sản phẩm không được trùng");
                return;
            }
            this.model.addItem(item);
            this.clear();
            this.view.reRender();
            this.closeModal();
        }
    }

    clear() {
        this.idItem.value = "";
        this.nameItem.value = "";
        this.priceItem.value = "";
        this.noteItem.value = "";
    }

    clearTable() {
        this.view.listItems = this.model.listItems;
        document.getElementById("table").innerHTML = "";

    }

    deleteItem() {
        var _item = {
            idItem: "HP-01", nameItem: "5510", noteItem: "gaming", priceItem: "20000000"
        }
        // console.log(this);

        this.model.deleteItem(_item);
        // this.view.deleteItem;
        this.view.reRender();
    }

    editItem() {
        console.log("edit clicked");
    }

    searchItem() {
        console.log("search clicked");

    }
}

const hic = new Controller(new Model(), new View());