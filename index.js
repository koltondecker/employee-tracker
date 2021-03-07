const inquire = require('inquirer');
const connection = require('./Public/assets/js/db');
const addEmployeeFunction = require('./Public/assets/js/addEmployee');
const addRoleFunction = require('./Public/assets/js/addRole');
const addDepartmentFunction = require('./Public/assets/js/addDepartment');
const allEmployeesFunction = require('./Public/assets/js/allEmployees');
const allEmployeesByDepartmentFunction = require('./Public/assets/js/allEmployeesByDepartment');
const allEmployeesByManagerFunction = require('./Public/assets/js/allEmployeesbyManager');
const allRolesFunction = require('./Public/assets/js/allRoles');
const allDepartmentsFunction = require('./Public/assets/js/allDepartments');
const updateEmployeeRoleFunction = require('./Public/assets/js/updateEmployeeRole');
const updateEmployeeManagerFunction = require('./Public/assets/js/updateEmployeeManager');
const removeEmployeeFunction = require('./Public/assets/js/removeEmployee');
const removeRoleFunction = require('./Public/assets/js/removeRole');
const removeDepartmentFunction = require('./Public/assets/js/removeDepartment');


function mainMenu() {

    inquire.prompt([
        {
            type: "list",
            name: "menuChoice",
            message: "What would you like to do?",
            choices: [
                "Add Employee",
                "Add Role",
                "Add Department",
                "View All Employees",
                "View All Employees by Department",
                "View All Employees by Manager",
                "View All Roles",
                "View All Departments",
                "Update Employee Role",
                "Update Employee Manager",
                "Remove Employee",
                "Remove Role",
                "Remove Department",
                "EXIT"
            ]
        }
    ]).then( (answer) => {

        switch (answer.menuChoice) {
            case "Add Employee":
                addEmployeeFunction.addEmployee();
                break;
            case "Add Role":
                addRoleFunction.addRole();
                break;
            case "Add Department":
                addDepartmentFunction.addDepartment();
                break;
            case "View All Employees":
                allEmployeesFunction.allEmployees();
                break;
            case "View All Employees by Department":
                allEmployeesByDepartmentFunction.allEmployeesByDepartment();
                break;
            case "View All Employees by Manager":
                allEmployeesByManagerFunction.allEmployeesByManager();
                break;
            case "View All Roles":
                allRolesFunction.allRoles();
                break;
            case "View All Departments":
                allDepartmentsFunction.allDepartments();
                break;
            case "Update Employee Role":
                updateEmployeeRoleFunction.updateEmployeeRole();
                break;
            case "Update Employee Manager":
                updateEmployeeManagerFunction.updateEmployeeManager();
                break;
            case "Remove Employee":
                removeEmployeeFunction.removeEmployee();
                break;
            case "Remove Role":
                removeRoleFunction.removeRole();
                break;
            case "Remove Department":
                removeDepartmentFunction.removeDepartment();
                break;
            case "EXIT":
                connection.end();
                break;
            default: 
                console.log("Sorry, something went wrong!");
                break;
        }
    });
};

mainMenu();

module.exports.mainMenu = mainMenu;