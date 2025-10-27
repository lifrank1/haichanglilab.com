// GitHub API utility for admin panel
// This handles committing changes to the repository via GitHub API

const GITHUB_API_BASE = 'https://api.github.com';
const REPO_OWNER = 'lifrank1'; // Your GitHub username
const REPO_NAME = 'haichanglilab.com'; // Your repository name

export interface GitHubCommitResponse {
  success: boolean;
  message: string;
  commitSha?: string;
}

export interface GitHubFileContent {
  content: string;
  sha: string;
}

/**
 * Get the current content of a file from the repository
 */
export async function getFileContent(
  pat: string,
  filePath: string
): Promise<GitHubFileContent | null> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}?ref=main`,
      {
        headers: {
          'Authorization': `token ${pat}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`GitHub API Error (${response.status}):`, errorText);
      throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return {
      content: atob(data.content), // Decode base64 content
      sha: data.sha,
    };
  } catch (error) {
    console.error('Error fetching file content:', error);
    return null;
  }
}

/**
 * Update a file in the repository
 */
export async function updateFile(
  pat: string,
  filePath: string,
  content: string,
  message: string,
  currentSha?: string
): Promise<GitHubCommitResponse> {
  try {
    // If we don't have the current SHA, fetch it first
    let sha = currentSha;
    if (!sha) {
      const fileContent = await getFileContent(pat, filePath);
      if (!fileContent) {
        return {
          success: false,
          message: 'Failed to get current file content',
        };
      }
      sha = fileContent.sha;
    }

    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${pat}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          content: btoa(content), // Encode content to base64
          sha,
          branch: 'main', // Specify the branch
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`GitHub API Error (${response.status}):`, errorText);
      throw new Error(`Failed to update file: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      message: 'File updated successfully',
      commitSha: data.commit.sha,
    };
  } catch (error) {
    console.error('Error updating file:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Validate GitHub PAT by making a test API call
 */
export async function validatePAT(pat: string): Promise<boolean> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/user`, {
      headers: {
        'Authorization': `token ${pat}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    return response.ok;
  } catch (error) {
    console.error('Error validating PAT:', error);
    return false;
  }
}

/**
 * Get repository information
 */
export async function getRepositoryInfo(pat: string) {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}`,
      {
        headers: {
          'Authorization': `token ${pat}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch repository info: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching repository info:', error);
    return null;
  }
}
