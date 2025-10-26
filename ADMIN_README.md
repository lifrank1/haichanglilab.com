# Admin Panel Setup

This admin panel allows you to manage publications, people, and research projects for the lab website.

## Setup

1. **GitHub Configuration**
   - Update the repository details in `lib/github.ts`:
     - `REPO_OWNER`: Your GitHub username
     - `REPO_NAME`: Your repository name

2. **Admin Password** (Optional)
   - The default password is `admin123` (hardcoded in `app/admin/page.tsx`)
   - You can change it by editing the `adminPassword` variable in the code
   - This is just to block accidental access - not cryptographically secure

## Usage

1. **Access Admin Panel**
   - Navigate to `/admin` on your website
   - Enter the admin password

2. **Managing Data**
   - Use the tabs to switch between Publications, People, and Research Projects
   - Click "Add" to create new entries
   - Click "Edit" to modify existing entries
   - Click "Delete" to remove entries

3. **GitHub Authentication**
   - When saving changes, you'll need to enter your GitHub Personal Access Token (PAT)
   - The PAT should have `repo` scope permissions
   - The PAT is only used for that specific operation and is not stored

## GitHub PAT Setup

1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate a new token with `repo` scope
3. Use this token when prompted in the admin panel

## Security Notes

- The admin password is hardcoded and client-side only (not cryptographically secure)
- It's just to prevent accidental access to the admin interface
- Real security comes from GitHub's server-side PAT validation
- Anyone with the admin password can access the UI, but they need a valid GitHub PAT to make changes
- The PAT is never stored and is only used in memory for API calls

## File Structure

- `app/admin/` - Admin panel pages and components
- `data/` - JSON data files (publications.json, people.json, researchProjects.json)
- `data/types.ts` - TypeScript type definitions
- `lib/github.ts` - GitHub API utilities
