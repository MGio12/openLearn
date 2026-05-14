export function extractSubagentAgentClasses(input) {
    if (!input || typeof input !== "object")
        return [];
    const record = input;
    const agentClasses = [];
    const addAgentClass = (value) => {
        if (typeof value === "string" && value.trim().length > 0)
            agentClasses.push(value.trim());
    };
    const addFromItems = (value) => {
        if (!Array.isArray(value))
            return;
        for (const item of value) {
            if (item && typeof item === "object")
                addAgentClass(item.agent);
        }
    };
    addAgentClass(record.agent);
    addFromItems(record.tasks);
    addFromItems(record.chain);
    return agentClasses;
}
