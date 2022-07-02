import React, {useEffect, useState} from 'react'
import './PayrollForm.css'
import logo from './logo1.png'
import profile1 from './Ellipse -1.png'
import profile2 from './Ellipse -2.png'
import profile3 from './Ellipse -3.png'
import profile4 from './Ellipse -4.png'
import { Link, useParams } from 'react-router-dom'
import EmployeeService from '../../service/EmployeeService'

const PayrollForm = (props) => {
    let startValue = {
        allDepartment: ["HR", "Sales", "Finance", "Engineer", "Others"],
        fullName: "",
        profilePic: "",
        gender: "",
        department: [],
        salary: "",
        startDate: "",
        notes: "",
        isUpdate: false,
    }
    const [formValue, setForm] = useState(startValue)
    const params = useParams();
    
    useEffect(() => {
        if (params.id) {
            getDataById(params.id);
        }
    },[params.id]);

    const getDataById = (employeeId) => {
        EmployeeService.getEmployee(employeeId)
        .then((response) => {
            let obj = response.data.data;
            setData(obj);
        });
    };
    const setData = (obj) => {
        let array = obj.startDate;
        console.log(obj);
        console.log()
        setForm({
            ...formValue,
            ...obj,
            id: obj.id,
            name: obj.name,
            department: obj.department,
            profilePic: obj.profilePic,
            salary: obj.salary,
            gender:obj.gender,
            isUpdate: true,
            day: array[0]+array[1],
            month: array[3]+array[4]+array[5],
            year: array[7]+array[8]+array[9]+array[10],
            notes: obj.notes
        })
    };

    const onCheckChange = (name) => {
        let index = formValue.department.indexOf(name);

        let checkArray = [...formValue.department];

        if (index > -1) checkArray.splice(index, 1);
        else checkArray.push(name);

        setForm({ ...formValue, department: checkArray });

    };
    const onReset = () => {
        setForm({
            ...startValue, id: formValue.id, isUpdate: formValue.isUpdate 
        });
    };
    const save = (event) => {
        event.preventDefault();

        let employeeObject = {
            id:formValue.employeeId,
            name: formValue.name,
            department: formValue.department,
            gender: formValue.gender,
            salary: formValue.salary,
            profilePic: formValue.profilePic,
            startDate: `${formValue.day}-${formValue.month}-${formValue.year}`,
            notes: formValue.notes
        };
        if(formValue.isUpdate) {
            var answer = window.confirm("Data once modified can't be restored! Do you wish to continue?");
            if(answer === true) {
                EmployeeService.editEmployee(params.id, employeeObject)
                alert("Data updated sucessfully!");
                this.props.history.push("");
                
            }
            else{
                window.location.reload();
            } 
        
        }
        else{
            EmployeeService.addEmployee(employeeObject).then((response) => {
                console.log(response);
                alert("Data Added Successfully! ", response);
                window.location.reload();
            })
        }
        
    }

    const onNameChange = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value });
        console.log('value for', event.target.name, event.target.value);
    }
    const checkDepartment = (name) => {
        return formValue.department && formValue.department.includes(name);
    }


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

            <div className="form-content">
                <form className="form" action="#" onReset="resetForm()"
                    onSubmit={ save }>
                    
                    <div className="row-content">
                        <label htmlFor="name" className="label text">Name</label>
                        <input type="text" className="input" id="name" name="name" value={formValue.name}
                            placeholder="Your name.." required onChange={onNameChange} />
                        <error-output className="text-error" htmlFor="name"></error-output>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="profilePic">Profile image</label>
                        <div className="profile-radio-content">
                            <label>
                                <input type="radio" id="profile1" name="profilePic" checked={formValue.profilePic === './Ellipse -1.png'}
                                    value="./Ellipse -1.png" onChange={onNameChange} />
                                <img className="profile" id="image1"
                                    src={profile1} />
                            </label>
                            <label>
                                <input type="radio" id="profile2"
                                    name="profilePic" checked={formValue.profilePic === './Ellipse -2.png'}
                                    value="./Ellipse -2.png" onChange={onNameChange} />
                                <img className="profile" id="image2"
                                    src={profile2} />
                            </label>
                            <label>
                                <input type="radio" id="profil3"
                                    name="profilePic" checked={formValue.profilePic === './Ellipse -3.png'}
                                    value="./Ellipse -3.png" onChange={onNameChange} />
                                <img className="profile" id="image3"
                                    src={profile3} />
                            </label>
                            <label>
                                <input type="radio" id="profile4"
                                    name="profilePic" checked={formValue.profilePic === './Ellipse -4.png'}
                                    value="./Ellipse -4.png" onChange={onNameChange} />
                                <img className="profile" id="image4"
                                    src={profile4} />
                            </label>
                        </div>
                    </div>
                    <div className="row-content">
                        <label htmlFor="gender" className="label text">Gender</label>
                        <div>
                            <input type="radio" id="male" name="gender" checked={formValue.gender === 'male'}
                                value="male" onChange={onNameChange} />
                            <label htmlFor="male" className="text">Male</label>
                            <input type="radio" id="female" name="gender" checked={formValue.gender === 'female'}
                                value="female" onChange={onNameChange} />
                            <label htmlFor="female" className="text">Female</label>
                        </div>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="department">
                            Department
                        </label>
                        <div className="label-dep">
                            {formValue.allDepartment.map((item) => (
                                <span key={item}>
                                    <input
                                        className="checkbox"
                                        type="checkbox"
                                        name = { item }
                                        onChange={() => onCheckChange(item)}
                                        checked={checkDepartment(item)}
                                        value={item}
                                    />
                                    <label className="text" htmlFor={item}>
                                        {item}
                                    </label>
                                </span>
                            ))}
                        </div>
                    </div>
                    <br></br>
                    <div className="row-content">
                        <label htmlFor="salary" className="label text">Choose your salary:
                        </label>
                        <input type="range" className="input" name="salary" id="salary"
                            min="300000" max="500000" step="100" value={formValue.salary} defaultValue="400000" onChange={onNameChange} />
                        <output className="salary-output text" htmlFor="salary">{formValue.salary}</output>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlFor="startDate">Start Date</label>
                        <div>
                            <select id="day" name="day" value={formValue.day}
                                onChange={onNameChange}>
                                <option value="">Day</option>
                                <option value="01">1</option>
                                <option value="02">2</option>
                                <option value="03">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                            <select name="month" id="month" value={formValue.month}
                                onChange={onNameChange}>
                                <option value="" >Month</option>
                                <option value="Jan">January</option>
                                <option value="Feb">Febuary</option>
                                <option value="Mar">March</option>
                                <option value="Apr">April</option>
                                <option value="May">May</option>
                                <option value="Jun">June</option>
                                <option value="Jul">July</option>
                                <option value="Aug">August</option>
                                <option value="Sep">September</option>
                                <option value="Oct">October</option>
                                <option value="Nov">November</option>
                                <option value="Dec">December</option>
                            </select>
                            <select name="year" id="year" value={formValue.year} onChange={onNameChange}>
                                <option value="" >Year</option>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>
                                <option value="2017">2017</option>
                                <option value="2016">2016</option>
                            </select>
                        </div>
                    </div>
                    <div className="row-content">
                        <label htmlFor="notes" className="label text">Notes</label>
                        <textarea id="notes" className="input" name="notes"
                            value={formValue.notes} placeholder="" onChange={onNameChange}></textarea>
                    </div>
                    <div className="buttonParent">
                        <Link to="/home" className="resetButton
                        button cancelButton">Cancel</Link>
                        <div className="submit-reset">
                        <button type="submit" className="button submitButton" id="submitButton">{formValue.isUpdate ? 'Update' : 'Submit'}</button>
                            <button type="reset" className="button resetButton" id="resetButton" onClick={onReset}>Reset</button>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default PayrollForm;