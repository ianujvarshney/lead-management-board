# Lead Management Kanban Board

A comprehensive React-based lead management system with drag-and-drop functionality, customizable stages, and detailed analytics.

## Features

- **Kanban Board**: Visual management of leads with customizable stages
- **Drag & Drop**: Move leads between stages and reorder within stages
- **Lead Management**: Create, edit, and delete leads with detailed information
- **Priority System**: Color-coded priority tags (High/Medium/Low)
- **Search & Filter**: Find leads by name, stage, agent, or priority
- **Dashboard**: Analytics showing leads per stage and per agent
- **Data Persistence**: All data saved to browser's localStorage
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **CSV Export**: Export all lead data to CSV format
- **Agent Management**: Assign leads to predefined sales agents

## Tech Stack

- **Frontend**: React 19.2.0
- **Build Tool**: Vite 6.2.0
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data Storage**: LocalStorage API

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd lead-management-board
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

### Adding Leads
1. Click the "Add Lead" button in the header
2. Fill in the lead details (name, email, phone, priority, agent, notes)
3. Select the initial stage
4. Click "Add Lead" to save

### Managing Stages
1. Click the "Manage Stages" button
2. Add new stages, rename existing ones, or delete unused stages
3. Stages are automatically updated across all leads

### Moving Leads
1. Drag and drop leads between columns to change their stage
2. Drag within a column to reorder leads
3. All changes are automatically saved

### Search and Filter
1. Use the search bar to find leads by name
2. Filter by stage, assigned agent, or priority level
3. Clear filters to see all leads

### Dashboard Analytics
View real-time statistics including:
- Total number of leads
- Leads per stage
- Leads per agent
- Priority breakdown

### Export Data
Click the "Export CSV" button to download all lead data as a CSV file.

## Data Structure

### Lead Object
```javascript
{
  id: string,
  name: string,
  email: string,
  phone: string,
  stage: string,
  priority: 'HIGH' | 'MEDIUM' | 'LOW',
  agent: string,
  notes: string,
  createdAt: string,
  updatedAt: string
}
```

### Stage Object
```javascript
{
  id: string,
  name: string,
  order: number
}
```

### Agent Object
```javascript
{
  id: string,
  name: string
}
```

## Default Data

The application comes with:
- **Default Stages**: New Lead, Contacted, Qualified, Won, Lost
- **Default Agents**: John Smith, Priya Patel, Ahmed Hassan
- **Priority Levels**: High (Red), Medium (Orange), Low (Green)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

---

**Live Demo**: [Optional - Add your deployment URL here]

**Repository**: [Add your GitHub repository URL here]
