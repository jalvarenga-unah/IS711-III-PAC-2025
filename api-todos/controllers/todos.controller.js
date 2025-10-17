

export const getAllTodos = (req, res) => {
    res.json({ "todos": [], "queries": req.query })
}

// export function getAllTodos(req, res) {
//     res.json({ "todos": [], "queries": req.query })
// }