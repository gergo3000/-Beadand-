class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    describe() {
        return `${this.name}, ${this.age} éves`;
    }

    render() {
        const p = document.createElement("p");
        p.innerText = this.describe();
        document.getElementById("personContainer").appendChild(p);
    }
}

class Student extends Person {
    constructor(name, age, school) {
        super(name, age);
        this.school = school;
    }

    describe() {
        return `${super.describe()}, iskola: ${this.school}`;
    }
}

function addPerson() {
    const p1 = new Person("Béla", 40);
    const s1 = new Student("Anna", 20, "GAMF");
    p1.render();
    s1.render();
}
