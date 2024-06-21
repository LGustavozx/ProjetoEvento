using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Domain.Enum;

namespace ProEventos.Domain.Identity
{
    public class UserRole
    {
        public User User { get; set; }
        public Role Role { get; set; }
    }
}