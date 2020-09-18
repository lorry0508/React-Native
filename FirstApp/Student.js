/* 
    类的使用
*/
export default class Student {
    constructor(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
    getDescription() {
        return '姓名：' + this.name + '，性别：' + this.sex + '，年龄：' + this.age;
    }
}