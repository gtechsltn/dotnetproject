using CRUDEmployee.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRUDEmployee.Services
{
   public interface IEmployeeRepository
    {
        Task<List<Employee>> GetEmployees();
        Task<ActionResult<Employee>> GetEmployeeByID(int EmployeeId);
        Task<Employee> AddEmployee(Employee employee);
        Task<Employee> UpdateEmployee(int employeeId,Employee  employee);
        Task<Employee> DeleteEmployee(int employeeId);
    }
}
