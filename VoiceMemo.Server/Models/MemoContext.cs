using Microsoft.EntityFrameworkCore;

namespace VoiceMemo.Server.Models
{
    public class MemoContext : DbContext
    {
        public MemoContext(DbContextOptions<MemoContext> options) : base(options)
        {
        }
        public DbSet<MemoItem> MemoItems { get; set; } = null!;
    }
}
