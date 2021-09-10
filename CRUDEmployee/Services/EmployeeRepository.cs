using CRUDEmployee.Model;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace CRUDEmployee.Services
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;
        public EmployeeRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("DefaultConnection");
        }
        public async Task<List<Employee>> GetEmployees()
        {
            string sqlcommand = @"SELECT *  FROM [dbo].[Employee]";
            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    connection.Open();
                    var result = (await connection.QueryAsync<Employee>(sqlcommand)).ToList();
                    return result;

                }
            }

            catch (Exception exception)
            {
                throw new Exception(exception.Message, exception);
            }
        }
        public async Task<ActionResult<Employee>> GetEmployeeByID(int EmployeeID)
        {
            string sqlcommand = "SELECT *  FROM [dbo].[Employee] where EmployeeID = @EmployeeID";
            try
            {

                using (var connection = new SqlConnection(_connectionString))
                {
                    connection.Open();
                    Employee  result = await connection.QueryFirstOrDefaultAsync<Employee>(sqlcommand, new { EmployeeID});
                    return result;
                }

            }

            catch (Exception exception)
            {
                throw new Exception(exception.Message, exception);
            }
        }
        public async Task<Employee> AddEmployee(Employee employee)
        {

            try
            {
                using (var connection = new SqlConnection(_connectionString))
                {
                    connection.Open();

                    var sqlcommand = @"Insert into Employee(FirstName, LastName, Position, EmialAddress, PhoneNumber,State,City) OUTPUT INSERTED.* VALUES(@FirstName, @LastName, @Position, @EmialAddress, @PhoneNumber,@State,@City)";

                    //Employee CreatedEmployee = await connection.QueryFirstOrDefaultAsync<Employee>(sqlcommand, employee);
                    Employee CreatedEmployee = await connection.QuerySingleAsync<Employee>(sqlcommand, employee);

                    return CreatedEmployee;
                }
            }

            catch (Exception exception)
            {
                throw new Exception(exception.Message, exception);
            }
        }

        public async Task<Employee> UpdateEmployee(int EmployeeID, Employee employee)
        {


            try
            {  using (var connection = new SqlConnection(_connectionString))
                {
                    connection.Open();

                    var sqlcommand = @"UPDATE [dbo].[Employee]  SET FirstName = @FirstName, LastName = @LastName, Position = @Position,EmialAddress=@EmialAddress,PhoneNumber=@PhoneNumber,State=@State, City=@City Where EmployeeID=@EmployeeID";
                    var parameters = new DynamicParameters();
                    parameters.Add("EmployeeID", EmployeeID);
                    parameters.Add("FirstName",employee.FirstName);
                    parameters.Add("LastName",employee.LastName);
                    parameters.Add("Position",employee.Position);
                    parameters.Add("EmialAddress", employee.EmialAddress);
                    parameters.Add("PhoneNumber",employee.PhoneNumber);
                    parameters.Add("State",employee.State);
                    parameters.Add("City",employee.City);
                    var NewUpdatedemployee = @"SELECT *  FROM [dbo].[Employee] where EmployeeID = @EmployeeID";

                    return  await connection.ExecuteScalarAsync<Employee>(sqlcommand, parameters);
            /*        Employee NewlyUpdatedEmployee = await connection.QueryFirstAsync<Employee>(NewUpdatedemployee, new { EmployeeID = @EmployeeID });


                    return NewlyUpdatedEmployee;*/
                }
            }

            catch (Exception exception)
            {
                throw new Exception(exception.Message, exception);
            }
        }
        public async Task<Employee> DeleteEmployee(int EmployeeId)
        {

            string sqlcommand = @"DELETE  FROM [dbo].[Employee] where EmployeeID = @EmployeeId";
            try
            {

                using (var connection = new SqlConnection(_connectionString))
                {
                    connection.Open();
                      Employee result= await connection.ExecuteScalarAsync<Employee>(sqlcommand, new { EmployeeId });
                   return result;
                }

            }

            catch (Exception exception)
            {
                throw new Exception(exception.Message, exception);
            }
        }

    }
}
