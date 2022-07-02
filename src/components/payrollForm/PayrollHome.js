import React, {Component} from 'react'
import './PayrollHome.css';
import logo from './logo1.png';
import icons1 from './add-24px.svg'
import { Link, withRouter } from "react-router-dom";
import profile1 from './Ellipse -1.png'
import profile2 from './Ellipse -2.png'
import profile3 from './Ellipse -3.png'
import profile4 from './Ellipse -4.png'
import edit from './edit.svg'
import deletes from './delete.svg'
import EmployeeService from '../../service/EmployeeService';

class PayrollHome extends Component {

	constructor(props) {
        super(props);
        this.state = {
            employee: [],
        };
    }

	showAll() {
        EmployeeService.getAllEmployee().then((response) => {
            this.setState({ employee: response.data.data });
        });
    }

    componentDidMount() {
        this.showAll();
    }

    deleteEmployee = (employeeId) => {
            var answer = window.confirm("once deleted can't be restored! Do you want to continue?");
            if(answer === true){
                EmployeeService.deleteEmployee(employeeId)
                alert("Employee deleted sucessfully");
                window.location.reload();
            }
            else {
                window.location.reload();
            }
    };

    editEmployee = (employeeId) => {
        this.props.history.push(`PayrollForm/${ employeeId }`)
    };
    
	render() {
        return (
            <div>
                <header className="header-content header">
                    <div className='logo-content'>
                        <img src={logo} alt="logo"/>
                        <div>
                            <span className="emp-text">EMPLOYEE</span><br/>
                            <span className="emp-text emp-payroll">PAYROLL</span>
                        </div>
                    </div>
                </header>
                <div className="main-content">
                    <div className="header-content">
                    <div className="emp-detail-text">
                        Employee Details<div className="emp-count">{this.state.employee.length}</div>
                    </div>
                    <Link to="/add" className='add-button'>
                    <img src={icons1} alt="Add User" />Add User</Link>
                    </div>

                <div className="table-main">
                    <table id="table-display" className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Department</th>
                                <th>Salary</th>
                                <th>Start Date</th>
                                <th>Notes</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                        {this.state.employee.map((employee) => (
                            <tr key={employee.id}>                             
                                <td>
                                    <img src={ employee.profilePic=== "./Ellipse -1.png" ? profile1 :
                                    employee.profilePic=== "./Ellipse -2.png" ? profile2 :
                                    employee.profilePic=== "./Ellipse -3.png" ? profile3 : profile4 
                                    } alt="ProfilePic" srcSet="" /></td>
                                <td>{employee.name}</td>
                                <td>{employee.gender}</td>
                                <td>
                                {employee.department.map(dep =>
                                <div className="dept-label" id="dept"> {dep} </div>)}
                                </td>
                                <td>{employee.salary}</td>
                                <td>{employee.startDate}</td>
                                <td>{ employee.notes }</td>
                                <td>
                                <img src={deletes} alt="delete" onClick={() =>
                                                        this.deleteEmployee(employee.id)}/>
                                <img src={edit} alt="edit" onClick={() =>
                                                        this.editEmployee(employee.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    
                    </table>
                    <script defer src="../js/home.js"></script>
                    <script defer src="../js/utility.js"></script>
                </div>
                </div>

            </div>
        )
    }
}

export default withRouter(PayrollHome);