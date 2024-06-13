//https://leetcode.com/problems/guess-the-word/description/

//HARD

```javascript
var findSecretWord = function (words, master) {
    const randomWord = words[Math.floor(Math.random() * words.length)]
    const response = master.guess(randomWord)

    if (response == 6) {
        return
    } else {
        const newWords = words.filter(item =>
            isThereSimilerChars(item, randomWord, response))

        return findSecretWord(newWords, master)
    }
};


function isThereSimilerChars(word1, word2, similarityNumber) {
    if (word1 == word2) {
        return false
    }

    let preSimilarityNumber = 0

    for (let k = 0; k < word1.length; k++) {
        if (word1[k] == word2[k]) {
            preSimilarityNumber++;
        }
    }

    if (preSimilarityNumber == 0 && similarityNumber == 0) {
        return true
    }

    if (!preSimilarityNumber) {
        return false
    }

    if (similarityNumber == 0 && preSimilarityNumber) {
        return false
    }

    return preSimilarityNumber >= similarityNumber ? true : false
}```
