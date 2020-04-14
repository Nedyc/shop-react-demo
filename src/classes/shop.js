class Shop{
    constructor() {
        this.id = "ijpxNJLM732vm8AeajMR";
        this.name = null;
        this.category = null;
        this.employees = null;
    }

    getId(){
        return this.id;
    }

    getName(){
        return this.name;
    }

    setName(name){
        this.name = name;
    }

    getCategory(){
        return this.category;
    }

    setCategory(category){
        this.category = category;
    }

    getEmployees(){
        return this.employees;
    }

    setEmployees(employees){
        this.employees = employees;
    }
}

export default new Shop();