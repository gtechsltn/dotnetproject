using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CRUDEmployee.Model
{
    public class Employee
    {
        [Key]
        [Required]
        public int EmployeeID { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Position { get; set; }
        [Required]
        public string EmialAddress { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string State { get; set; }
        [Required]
        public string City { get; set; }

    }
}
