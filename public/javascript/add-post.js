async function addPost(event) {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const post_content = document.querySelector('#post-content').value.trim();

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_content
        }),
        headers: { 'Content-Type': 'application/json'}
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    };
};

document.querySelector('#add-post-form').addEventListener('submit', addPost);