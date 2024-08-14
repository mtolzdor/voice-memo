using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VoiceMemo.Server.Models;

namespace VoiceMemo.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemoItemsController : ControllerBase
    {
        private readonly MemoContext _context;

        public MemoItemsController(MemoContext context)
        {
            _context = context;
        }

        // GET: api/MemoItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemoItem>>> GetMemoItems()
        {
            return await _context.MemoItems.ToListAsync();
        }

        // GET: api/MemoItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MemoItem>> GetMemoItem(int id)
        {
            var memoItem = await _context.MemoItems.FindAsync(id);

            if (memoItem == null)
            {
                return NotFound();
            }

            return memoItem;
        }

        // PUT: api/MemoItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMemoItem(int id, MemoItem memoItem)
        {
            if (id != memoItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(memoItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemoItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/MemoItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MemoItem>> PostMemoItem(MemoItem memoItem)
        {
            _context.MemoItems.Add(memoItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMemoItem", new { id = memoItem.Id }, memoItem);
        }

        // DELETE: api/MemoItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMemoItem(int id)
        {
            var memoItem = await _context.MemoItems.FindAsync(id);
            if (memoItem == null)
            {
                return NotFound();
            }

            _context.MemoItems.Remove(memoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MemoItemExists(int id)
        {
            return _context.MemoItems.Any(e => e.Id == id);
        }
    }
}
