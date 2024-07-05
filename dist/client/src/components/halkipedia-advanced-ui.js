"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const lucide_react_1 = require("lucide-react");
const AdvancedHalkipedia = () => {
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [isDarkMode, setIsDarkMode] = (0, react_1.useState)(false);
    const [showSettings, setShowSettings] = (0, react_1.useState)(false);
    const [layoutType, setLayoutType] = (0, react_1.useState)('grid');
    const [searchQuery, setSearchQuery] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        // Simulating loading process
        setTimeout(() => setIsLoading(false), 3000);
    }, []);
    const handleSearch = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.post('/nlp', { text: searchQuery });
            console.log('Search results:', response.data);
        }
        catch (error) {
            console.error('Error during search:', error);
        }
    });
    if (isLoading) {
        return (react_1.default.createElement("div", { className: "h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600" },
            react_1.default.createElement("div", { className: "text-white text-center" },
                react_1.default.createElement("h1", { className: "text-6xl font-bold mb-4 animate-pulse" }, "Halkipedia"),
                react_1.default.createElement("p", { className: "text-xl" }, "Entering the realm of knowledge..."))));
    }
    return (react_1.default.createElement("div", { className: `min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}` },
        react_1.default.createElement("header", { className: `${isDarkMode ? 'bg-gray-800' : 'bg-blue-600'} text-white p-4 transition-colors duration-500` },
            react_1.default.createElement("div", { className: "container mx-auto flex justify-between items-center" },
                react_1.default.createElement("h1", { className: "text-3xl font-bold" }, "Halkipedia"),
                react_1.default.createElement("div", { className: "flex items-center space-x-4" },
                    react_1.default.createElement("div", { className: "relative" },
                        react_1.default.createElement("input", { type: "text", placeholder: "AI-Powered Search", className: `py-2 px-4 pr-10 rounded-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} w-64 focus:outline-none focus:ring-2 focus:ring-blue-300`, value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), onKeyPress: (e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            } }),
                        react_1.default.createElement(lucide_react_1.Search, { className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500", size: 18 })),
                    react_1.default.createElement("button", { onClick: () => setShowSettings(!showSettings) },
                        react_1.default.createElement(lucide_react_1.Settings, { size: 24 })),
                    react_1.default.createElement("button", { onClick: () => setIsDarkMode(!isDarkMode) }, isDarkMode ? react_1.default.createElement(lucide_react_1.Sun, { size: 24 }) : react_1.default.createElement(lucide_react_1.Moon, { size: 24 })),
                    react_1.default.createElement("button", null,
                        react_1.default.createElement(lucide_react_1.User, { size: 24 }))))),
        react_1.default.createElement("main", { className: "container mx-auto mt-8 p-4" },
            react_1.default.createElement("div", { className: `${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 transition-colors duration-500` },
                react_1.default.createElement("h2", { className: "text-3xl font-semibold mb-6 flex items-center" },
                    react_1.default.createElement(lucide_react_1.Zap, { className: "mr-2", size: 28 }),
                    "Welcome to Advanced Halkipedia"),
                react_1.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" },
                    react_1.default.createElement("div", { className: `${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'} p-4 rounded-lg transition-colors duration-500` },
                        react_1.default.createElement("h3", { className: "font-semibold mb-2 flex items-center" },
                            react_1.default.createElement(lucide_react_1.Book, { className: "mr-2", size: 20 }),
                            "AI-Curated Articles"),
                        react_1.default.createElement("ul", { className: "space-y-2" },
                            react_1.default.createElement("li", null, "Quantum Computing Breakthroughs"),
                            react_1.default.createElement("li", null, "The Ethics of Artificial Intelligence"),
                            react_1.default.createElement("li", null, "Sustainable Energy Solutions"))),
                    react_1.default.createElement("div", { className: `${isDarkMode ? 'bg-gray-700' : 'bg-green-50'} p-4 rounded-lg transition-colors duration-500` },
                        react_1.default.createElement("h3", { className: "font-semibold mb-2 flex items-center" },
                            react_1.default.createElement(lucide_react_1.Layers, { className: "mr-2", size: 20 }),
                            "Visual Knowledge Map"),
                        react_1.default.createElement("p", null, "Interactive 3D visualization of connected topics"),
                        react_1.default.createElement("button", { className: "mt-2 bg-green-500 text-white px-3 py-1 rounded" }, "Explore Map")),
                    react_1.default.createElement("div", { className: `${isDarkMode ? 'bg-gray-700' : 'bg-purple-50'} p-4 rounded-lg transition-colors duration-500` },
                        react_1.default.createElement("h3", { className: "font-semibold mb-2 flex items-center" },
                            react_1.default.createElement(lucide_react_1.Palette, { className: "mr-2", size: 20 }),
                            "Personalized Learning Path"),
                        react_1.default.createElement("p", null, "AI-generated curriculum based on your interests"),
                        react_1.default.createElement("button", { className: "mt-2 bg-purple-500 text-white px-3 py-1 rounded" }, "Generate Path"))),
                react_1.default.createElement("div", { className: "mt-8" },
                    react_1.default.createElement("h3", { className: "text-2xl font-semibold mb-4" }, "Your Knowledge Portfolio"),
                    react_1.default.createElement("div", { className: "flex justify-between items-center mb-4" },
                        react_1.default.createElement("p", null, "Track your learning progress and contributions"),
                        react_1.default.createElement("div", { className: "flex space-x-2" },
                            react_1.default.createElement("button", { onClick: () => setLayoutType('grid'), className: `p-2 rounded ${layoutType === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}` },
                                react_1.default.createElement(lucide_react_1.Grid, { size: 20 })),
                            react_1.default.createElement("button", { onClick: () => setLayoutType('list'), className: `p-2 rounded ${layoutType === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}` },
                                react_1.default.createElement(lucide_react_1.List, { size: 20 })))),
                    react_1.default.createElement("div", { className: `grid ${layoutType === 'grid' ? 'grid-cols-1 md:grid-cols-3 gap-4' : 'grid-cols-1 gap-2'}` }, ['Articles Edited', 'Contributions', 'Learning Streaks'].map((item, index) => (react_1.default.createElement("div", { key: index, className: `${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} p-4 rounded-lg transition-colors duration-500` },
                        react_1.default.createElement("h4", { className: "font-semibold" }, item),
                        react_1.default.createElement("p", { className: "text-2xl font-bold mt-2" }, Math.floor(Math.random() * 100))))))))),
        showSettings && (react_1.default.createElement("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" },
            react_1.default.createElement("div", { className: `${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 w-96` },
                react_1.default.createElement("h3", { className: "text-2xl font-semibold mb-4" }, "Advanced Settings"),
                react_1.default.createElement("div", { className: "space-y-4" },
                    react_1.default.createElement("div", { className: "flex items-center justify-between" },
                        react_1.default.createElement("span", null, "AI Assistance Level"),
                        react_1.default.createElement("select", { className: `${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded p-1` },
                            react_1.default.createElement("option", null, "High"),
                            react_1.default.createElement("option", null, "Medium"),
                            react_1.default.createElement("option", null, "Low"))),
                    react_1.default.createElement("div", { className: "flex items-center justify-between" },
                        react_1.default.createElement("span", null, "Language Model"),
                        react_1.default.createElement("select", { className: `${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded p-1` },
                            react_1.default.createElement("option", null, "GPT-4"),
                            react_1.default.createElement("option", null, "GPT-3.5"),
                            react_1.default.createElement("option", null, "Custom"))),
                    react_1.default.createElement("div", { className: "flex items-center justify-between" },
                        react_1.default.createElement("span", null, "Content Complexity"),
                        react_1.default.createElement("input", { type: "range", min: "1", max: "5", className: "w-32" })),
                    react_1.default.createElement("div", { className: "flex items-center justify-between" },
                        react_1.default.createElement("span", null, "Audio Narration"),
                        react_1.default.createElement("button", { className: `${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white px-3 py-1 rounded flex items-center` },
                            react_1.default.createElement(lucide_react_1.Volume2, { size: 16, className: "mr-1" }),
                            " Enable"))),
                react_1.default.createElement("button", { onClick: () => setShowSettings(false), className: `mt-6 w-full ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white py-2 rounded` }, "Save Settings")))),
        react_1.default.createElement("footer", { className: `${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} mt-8 py-4 transition-colors duration-500` },
            react_1.default.createElement("div", { className: "container mx-auto text-center" },
                react_1.default.createElement("p", null, "\u00A9 2024 Advanced Halkipedia. Empowered by cutting-edge AI.")))));
};
exports.default = AdvancedHalkipedia;
