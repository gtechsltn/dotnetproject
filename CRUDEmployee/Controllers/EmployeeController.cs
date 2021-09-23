using CRUDEmployee.Model;
using CRUDEmployee.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CRUDEmployee.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;
        public EmployeeController(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        [HttpGet]
        public async Task<ActionResult<Employee>> GetEmployees()
        {
            var result = await _employeeRepository.GetEmployees();
            if (result.Count == 0)
            {
                return NotFound("Not record found");
            }

            return Ok(result);


        }


        [Route("get")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployeeByID(int id)
        {
            if (id == 0)
            {
                return BadRequest($"Employee can not have id of 0");

            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Id can can not be null");

            }
            var result = await _employeeRepository.GetEmployeeByID(id);
            if (result.Value == null)
            {
                return NotFound($"Employee with ID {id} was not found");

            }


            return Ok(result.Value);

        }

        [HttpPost]
        public async Task<ActionResult<Employee>> AddNewEmployee([FromBody] Employee employee)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest();

            }
            var CreatedEmployee = await _employeeRepository.AddEmployee(employee);
            return CreatedAtAction(nameof(GetEmployeeByID), new { EmployeeID = CreatedEmployee.EmployeeID }, CreatedEmployee);


        }
        [HttpPut("{employeeID}")]
        public async Task<ActionResult<Employee>> UpdateEmployee(int employeeID, [FromBody]Employee employee)
        {

            if (!ModelState.IsValid)

            {
                return BadRequest("ID can not be empty");
            }
            var UpdateEmployee = await _employeeRepository.GetEmployeeByID(employeeID);
            if (UpdateEmployee.Value == null)
            {
                return NotFound($"Employee with ID {employeeID} was not found");

            }

             var NewUpdatedEmployee = await _employeeRepository.UpdateEmployee(employeeID, employee);


            return Ok(NewUpdatedEmployee);

        }
        [HttpDelete("{employeeID}")]
        public async Task<ActionResult<Employee>> DeleteEmployee(int employeeID)
        {

            if (employeeID == null)
            {
                return BadRequest("Not ID was provided");

            }
            var employe = await _employeeRepository.GetEmployeeByID(employeeID);
            if (employe.Value== null)
            {
                return NotFound($"Not record found for employee with ID {employeeID}");

            }
             await _employeeRepository.DeleteEmployee(employeeID);

            return Ok(employe.Value);

        }
    }



}

