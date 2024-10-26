(async () =>
    await import(["./bouncer.js", "./bloomer.js"][Math.floor(Math.random() * 2)]))();
