from langflow.template import frontend_node

# These should always be instantiated
CUSTOM_NODES = {
    "prompts": {
        "ZeroShotPrompt": frontend_node.prompts.ZeroShotPromptNode(),
    },
    "tools": {
        "PythonFunctionTool": frontend_node.PythonFunctionToolNode(),
        "Tool": frontend_node.ToolNode(),
    },
    "agents": {
        "JsonAgent": frontend_node.JsonAgentNode(),
        "CSVAgent": frontend_node.CSVAgentNode(),
        "initialize_agent": frontend_node.InitializeAgentNode(),
        "VectorStoreAgent": frontend_node.VectorStoreAgentNode(),
        "VectorStoreRouterAgent": frontend_node.VectorStoreRouterAgentNode(),
        "SQLAgent": frontend_node.SQLAgentNode(),
    },
    "utilities": {
        "SQLDatabase": frontend_node.SQLDatabaseNode(),
    },
    "chains": {
        "SeriesCharacterChain": frontend_node.chains.SeriesCharacterChainNode(),
        "TimeTravelGuideChain": frontend_node.chains.TimeTravelGuideChainNode(),
        "MidJourneyPromptChain": frontend_node.chains.MidJourneyPromptChainNode(),
        "load_qa_chain": frontend_node.chains.CombineDocsChainNode(),
    },
    "connectors": {
        "ConnectorFunction": frontend_node.ConnectorFunctionFrontendNode(),
        "DallE2Generator": frontend_node.DallE2GeneratorFrontendNode(),
    },
}


def get_custom_nodes(node_type: str):
    """Get custom nodes."""
    return CUSTOM_NODES.get(node_type, {})
