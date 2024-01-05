import { Trie } from "../trie.mjs";

let trie = new Trie();
trie.insert("고등어");
trie.insert("김치");
trie.insert("김치찜");
trie.insert("김치찌개");

console.log(`두부: ${trie.search("두부")}`);
console.log(`김치: ${trie.search("김치")}`);
