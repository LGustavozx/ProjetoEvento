using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProEventos.Persistence.models
{
    public class PageParams
    {
        public int MaxPageSize = 50;
        public int PageNumber {get; set;} = 1;

        private int pageSize = 10;

        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }

        public string Term { get; set; } = string.Empty;
    }
}