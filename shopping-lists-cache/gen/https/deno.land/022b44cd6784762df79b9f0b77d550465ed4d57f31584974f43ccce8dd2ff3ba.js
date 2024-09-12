// Based of https://github.com/bendrucker/postgres-array
// Copyright (c) Ben Drucker <bvdrucker@gmail.com> (bendrucker.me). MIT License.
export function parseArray(source, transform, separator = ",") {
  return new ArrayParser(source, transform, separator).parse();
}
class ArrayParser {
  source;
  transform;
  separator;
  position;
  entries;
  recorded;
  dimension;
  constructor(source, transform, separator){
    this.source = source;
    this.transform = transform;
    this.separator = separator;
    this.position = 0;
    this.entries = [];
    this.recorded = [];
    this.dimension = 0;
  }
  isEof() {
    return this.position >= this.source.length;
  }
  nextCharacter() {
    const character = this.source[this.position++];
    if (character === "\\") {
      return {
        value: this.source[this.position++],
        escaped: true
      };
    }
    return {
      value: character,
      escaped: false
    };
  }
  record(character) {
    this.recorded.push(character);
  }
  newEntry(includeEmpty = false) {
    let entry;
    if (this.recorded.length > 0 || includeEmpty) {
      entry = this.recorded.join("");
      if (entry === "NULL" && !includeEmpty) {
        entry = null;
      }
      if (entry !== null) entry = this.transform(entry);
      this.entries.push(entry);
      this.recorded = [];
    }
  }
  consumeDimensions() {
    if (this.source[0] === "[") {
      while(!this.isEof()){
        const char = this.nextCharacter();
        if (char.value === "=") break;
      }
    }
  }
  parse(nested = false) {
    let character, parser, quote;
    this.consumeDimensions();
    while(!this.isEof()){
      character = this.nextCharacter();
      if (character.value === "{" && !quote) {
        this.dimension++;
        if (this.dimension > 1) {
          parser = new ArrayParser(this.source.substr(this.position - 1), this.transform, this.separator);
          this.entries.push(parser.parse(true));
          this.position += parser.position - 2;
        }
      } else if (character.value === "}" && !quote) {
        this.dimension--;
        if (!this.dimension) {
          this.newEntry();
          if (nested) return this.entries;
        }
      } else if (character.value === '"' && !character.escaped) {
        if (quote) this.newEntry(true);
        quote = !quote;
      } else if (character.value === this.separator && !quote) {
        this.newEntry();
      } else {
        this.record(character.value);
      }
    }
    if (this.dimension !== 0) {
      throw new Error("array dimension not balanced");
    }
    return this.entries;
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvcG9zdGdyZXNAdjAuMTcuMC9xdWVyeS9hcnJheV9wYXJzZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQmFzZWQgb2YgaHR0cHM6Ly9naXRodWIuY29tL2JlbmRydWNrZXIvcG9zdGdyZXMtYXJyYXlcbi8vIENvcHlyaWdodCAoYykgQmVuIERydWNrZXIgPGJ2ZHJ1Y2tlckBnbWFpbC5jb20+IChiZW5kcnVja2VyLm1lKS4gTUlUIExpY2Vuc2UuXG5cbnR5cGUgQWxsb3dlZFNlcGFyYXRvcnMgPSBcIixcIiB8IFwiO1wiO1xuLyoqIEluY29ycmVjdGx5IHBhcnNlZCBkYXRhIHR5cGVzIGRlZmF1bHQgdG8gbnVsbCAqL1xudHlwZSBBcnJheVJlc3VsdDxUPiA9IEFycmF5PFQgfCBudWxsIHwgQXJyYXlSZXN1bHQ8VD4+O1xudHlwZSBUcmFuc2Zvcm1lcjxUPiA9ICh2YWx1ZTogc3RyaW5nKSA9PiBUO1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VBcnJheTxUPihcbiAgc291cmNlOiBzdHJpbmcsXG4gIHRyYW5zZm9ybTogVHJhbnNmb3JtZXI8VD4sXG4gIHNlcGFyYXRvcjogQWxsb3dlZFNlcGFyYXRvcnMgPSBcIixcIixcbikge1xuICByZXR1cm4gbmV3IEFycmF5UGFyc2VyKHNvdXJjZSwgdHJhbnNmb3JtLCBzZXBhcmF0b3IpLnBhcnNlKCk7XG59XG5cbmNsYXNzIEFycmF5UGFyc2VyPFQ+IHtcbiAgcG9zaXRpb24gPSAwO1xuICBlbnRyaWVzOiBBcnJheVJlc3VsdDxUPiA9IFtdO1xuICByZWNvcmRlZDogc3RyaW5nW10gPSBbXTtcbiAgZGltZW5zaW9uID0gMDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgc291cmNlOiBzdHJpbmcsXG4gICAgcHVibGljIHRyYW5zZm9ybTogVHJhbnNmb3JtZXI8VD4sXG4gICAgcHVibGljIHNlcGFyYXRvcjogQWxsb3dlZFNlcGFyYXRvcnMsXG4gICkge31cblxuICBpc0VvZigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbiA+PSB0aGlzLnNvdXJjZS5sZW5ndGg7XG4gIH1cblxuICBuZXh0Q2hhcmFjdGVyKCkge1xuICAgIGNvbnN0IGNoYXJhY3RlciA9IHRoaXMuc291cmNlW3RoaXMucG9zaXRpb24rK107XG4gICAgaWYgKGNoYXJhY3RlciA9PT0gXCJcXFxcXCIpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiB0aGlzLnNvdXJjZVt0aGlzLnBvc2l0aW9uKytdLFxuICAgICAgICBlc2NhcGVkOiB0cnVlLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiBjaGFyYWN0ZXIsXG4gICAgICBlc2NhcGVkOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgcmVjb3JkKGNoYXJhY3Rlcjogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5yZWNvcmRlZC5wdXNoKGNoYXJhY3Rlcik7XG4gIH1cblxuICBuZXdFbnRyeShpbmNsdWRlRW1wdHkgPSBmYWxzZSk6IHZvaWQge1xuICAgIGxldCBlbnRyeTtcbiAgICBpZiAodGhpcy5yZWNvcmRlZC5sZW5ndGggPiAwIHx8IGluY2x1ZGVFbXB0eSkge1xuICAgICAgZW50cnkgPSB0aGlzLnJlY29yZGVkLmpvaW4oXCJcIik7XG4gICAgICBpZiAoZW50cnkgPT09IFwiTlVMTFwiICYmICFpbmNsdWRlRW1wdHkpIHtcbiAgICAgICAgZW50cnkgPSBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKGVudHJ5ICE9PSBudWxsKSBlbnRyeSA9IHRoaXMudHJhbnNmb3JtKGVudHJ5KTtcbiAgICAgIHRoaXMuZW50cmllcy5wdXNoKGVudHJ5KTtcbiAgICAgIHRoaXMucmVjb3JkZWQgPSBbXTtcbiAgICB9XG4gIH1cblxuICBjb25zdW1lRGltZW5zaW9ucygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zb3VyY2VbMF0gPT09IFwiW1wiKSB7XG4gICAgICB3aGlsZSAoIXRoaXMuaXNFb2YoKSkge1xuICAgICAgICBjb25zdCBjaGFyID0gdGhpcy5uZXh0Q2hhcmFjdGVyKCk7XG4gICAgICAgIGlmIChjaGFyLnZhbHVlID09PSBcIj1cIikgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcGFyc2UobmVzdGVkID0gZmFsc2UpOiBBcnJheVJlc3VsdDxUPiB7XG4gICAgbGV0IGNoYXJhY3RlciwgcGFyc2VyLCBxdW90ZTtcbiAgICB0aGlzLmNvbnN1bWVEaW1lbnNpb25zKCk7XG4gICAgd2hpbGUgKCF0aGlzLmlzRW9mKCkpIHtcbiAgICAgIGNoYXJhY3RlciA9IHRoaXMubmV4dENoYXJhY3RlcigpO1xuICAgICAgaWYgKGNoYXJhY3Rlci52YWx1ZSA9PT0gXCJ7XCIgJiYgIXF1b3RlKSB7XG4gICAgICAgIHRoaXMuZGltZW5zaW9uKys7XG4gICAgICAgIGlmICh0aGlzLmRpbWVuc2lvbiA+IDEpIHtcbiAgICAgICAgICBwYXJzZXIgPSBuZXcgQXJyYXlQYXJzZXIoXG4gICAgICAgICAgICB0aGlzLnNvdXJjZS5zdWJzdHIodGhpcy5wb3NpdGlvbiAtIDEpLFxuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0sXG4gICAgICAgICAgICB0aGlzLnNlcGFyYXRvcixcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMuZW50cmllcy5wdXNoKHBhcnNlci5wYXJzZSh0cnVlKSk7XG4gICAgICAgICAgdGhpcy5wb3NpdGlvbiArPSBwYXJzZXIucG9zaXRpb24gLSAyO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGNoYXJhY3Rlci52YWx1ZSA9PT0gXCJ9XCIgJiYgIXF1b3RlKSB7XG4gICAgICAgIHRoaXMuZGltZW5zaW9uLS07XG4gICAgICAgIGlmICghdGhpcy5kaW1lbnNpb24pIHtcbiAgICAgICAgICB0aGlzLm5ld0VudHJ5KCk7XG4gICAgICAgICAgaWYgKG5lc3RlZCkgcmV0dXJuIHRoaXMuZW50cmllcztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChjaGFyYWN0ZXIudmFsdWUgPT09ICdcIicgJiYgIWNoYXJhY3Rlci5lc2NhcGVkKSB7XG4gICAgICAgIGlmIChxdW90ZSkgdGhpcy5uZXdFbnRyeSh0cnVlKTtcbiAgICAgICAgcXVvdGUgPSAhcXVvdGU7XG4gICAgICB9IGVsc2UgaWYgKGNoYXJhY3Rlci52YWx1ZSA9PT0gdGhpcy5zZXBhcmF0b3IgJiYgIXF1b3RlKSB7XG4gICAgICAgIHRoaXMubmV3RW50cnkoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVjb3JkKGNoYXJhY3Rlci52YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmRpbWVuc2lvbiAhPT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXJyYXkgZGltZW5zaW9uIG5vdCBiYWxhbmNlZFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZW50cmllcztcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHdEQUF3RDtBQUN4RCxnRkFBZ0Y7QUFPaEYsT0FBTyxTQUFTLFdBQ2QsTUFBYyxFQUNkLFNBQXlCLEVBQ3pCLFlBQStCLEdBQUc7RUFFbEMsT0FBTyxJQUFJLFlBQVksUUFBUSxXQUFXLFdBQVcsS0FBSztBQUM1RDtBQUVBLE1BQU07RUFPSztFQUNBO0VBQ0E7RUFSVCxTQUFhO0VBQ2IsUUFBNkI7RUFDN0IsU0FBd0I7RUFDeEIsVUFBYztFQUVkLFlBQ1MsUUFDQSxXQUNBLFVBQ1A7a0JBSE87cUJBQ0E7cUJBQ0E7U0FSVCxXQUFXO1NBQ1gsVUFBMEIsRUFBRTtTQUM1QixXQUFxQixFQUFFO1NBQ3ZCLFlBQVk7RUFNVDtFQUVILFFBQWlCO0lBQ2YsT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTtFQUM1QztFQUVBLGdCQUFnQjtJQUNkLE1BQU0sWUFBWSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUc7SUFDOUMsSUFBSSxjQUFjLE1BQU07TUFDdEIsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHO1FBQ25DLFNBQVM7TUFDWDtJQUNGO0lBQ0EsT0FBTztNQUNMLE9BQU87TUFDUCxTQUFTO0lBQ1g7RUFDRjtFQUVBLE9BQU8sU0FBaUIsRUFBUTtJQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztFQUNyQjtFQUVBLFNBQVMsZUFBZSxLQUFLLEVBQVE7SUFDbkMsSUFBSTtJQUNKLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxjQUFjO01BQzVDLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7TUFDM0IsSUFBSSxVQUFVLFVBQVUsQ0FBQyxjQUFjO1FBQ3JDLFFBQVE7TUFDVjtNQUNBLElBQUksVUFBVSxNQUFNLFFBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQztNQUMzQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztNQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUU7SUFDcEI7RUFDRjtFQUVBLG9CQUEwQjtJQUN4QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEtBQUs7TUFDMUIsTUFBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUk7UUFDcEIsTUFBTSxPQUFPLElBQUksQ0FBQyxhQUFhO1FBQy9CLElBQUksS0FBSyxLQUFLLEtBQUssS0FBSztNQUMxQjtJQUNGO0VBQ0Y7RUFFQSxNQUFNLFNBQVMsS0FBSyxFQUFrQjtJQUNwQyxJQUFJLFdBQVcsUUFBUTtJQUN2QixJQUFJLENBQUMsaUJBQWlCO0lBQ3RCLE1BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFJO01BQ3BCLFlBQVksSUFBSSxDQUFDLGFBQWE7TUFDOUIsSUFBSSxVQUFVLEtBQUssS0FBSyxPQUFPLENBQUMsT0FBTztRQUNyQyxJQUFJLENBQUMsU0FBUztRQUNkLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHO1VBQ3RCLFNBQVMsSUFBSSxZQUNYLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFDbkMsSUFBSSxDQUFDLFNBQVMsRUFDZCxJQUFJLENBQUMsU0FBUztVQUVoQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQztVQUMvQixJQUFJLENBQUMsUUFBUSxJQUFJLE9BQU8sUUFBUSxHQUFHO1FBQ3JDO01BQ0YsT0FBTyxJQUFJLFVBQVUsS0FBSyxLQUFLLE9BQU8sQ0FBQyxPQUFPO1FBQzVDLElBQUksQ0FBQyxTQUFTO1FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7VUFDbkIsSUFBSSxDQUFDLFFBQVE7VUFDYixJQUFJLFFBQVEsT0FBTyxJQUFJLENBQUMsT0FBTztRQUNqQztNQUNGLE9BQU8sSUFBSSxVQUFVLEtBQUssS0FBSyxPQUFPLENBQUMsVUFBVSxPQUFPLEVBQUU7UUFDeEQsSUFBSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsUUFBUSxDQUFDO01BQ1gsT0FBTyxJQUFJLFVBQVUsS0FBSyxLQUFLLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxPQUFPO1FBQ3ZELElBQUksQ0FBQyxRQUFRO01BQ2YsT0FBTztRQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxLQUFLO01BQzdCO0lBQ0Y7SUFDQSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssR0FBRztNQUN4QixNQUFNLElBQUksTUFBTTtJQUNsQjtJQUNBLE9BQU8sSUFBSSxDQUFDLE9BQU87RUFDckI7QUFDRiJ9