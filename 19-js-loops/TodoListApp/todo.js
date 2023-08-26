const todos = ["Collect chicken eggs", "Clean litter box"]
while (true) {
    const command = prompt("What would you like to do?");

    if (command.toLowerCase() === "new") {
        const todo = prompt("Enter new todo");
        todos.push(todo)

    } else if (command.toLowerCase() === "list") {
        console.log("*******************");
        for (let i = 0; i < todos.length; i++) {
            console.log(`${i}: ${todos[i]}`);
        }
        console.log("*******************");

    } else if (command.toLowerCase() === "delete") {
        const index = parseInt(prompt("Enter the todo index to delete."))

        if (index >= 0) {
            const deleted = todos.splice(index, 1);
            console.log(`Ok, deleted: ${deleted}`);
        } else {
            console.log("Invalid index.");
        }

    } else if (command.toLowerCase() === "quit") {
        console.log("OK, YOU QUIT THE APP");
        break;

    } else {
        alert("Invalid command.")
    }
}